
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { User} from '../schema/user.schema';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { CreateUserDto } from 'src/dto/createUser.dto';
import * as casual from 'casual'




@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // CREATE USER
  async createUser(CreateUserDto): Promise<User> {
    
    const highestIdUser = await this.userModel.findOne({}, {}, { sort: { id: -1 } }).exec();
    let nextId = 1;
    if (highestIdUser) {
      nextId = highestIdUser.id + 1;
    }

    const user:CreateUserDto = {
      id : nextId,
      name :casual.first_name,
      age : casual.integer(18, 70),
      email :casual.email,
      phone : casual.phone,
      postal_code : casual.zip('#####'),
    }
    console.log(user)
    return await this.userModel.create(user)    
  }

  // READ USER
  async findAll(): Promise<User[]> {
    return this.userModel.find().sort({id:-1})
  }

  // DELETE USER
  async delete(id: number): Promise<User> {
    
    let removedUser = await this.userModel.findOneAndDelete({ id }).exec();
    if(!removedUser){
      throw new NotFoundException("User with id not found")
    }
    return removedUser;
    
  }

  // UPDATE USER
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, name, age, email, phone, postal_code } = updateUserDto;

    // Create a dynamic update object with the fields to be updated
    const updateFields: Partial<User> = {};

    if (name) {
      updateFields.name = name;
    }
    if (age) {
      updateFields.age = age;
    }
    if (email) {
      updateFields.email = email;
    }
    if (phone) {
      updateFields.phone = phone;
    }
    if (postal_code) {
      updateFields.postal_code = postal_code;
    }

    try {
      // Update the user with the specified fields
      const updatedUser = await this.userModel.findOneAndUpdate({id}, updateFields);

      if (!updatedUser) {
        throw new Error('User not found.');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Invalid user ID or fields.');
    }
  } 
 
}

