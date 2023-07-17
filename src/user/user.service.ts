
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    return this.userModel.findOneAndDelete({ id }).exec();
  }

// UPDATE USER
  async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.phone = updateUserDto.phone;
    user.postal_code = updateUserDto.postal_code;
    return this.userModel.findByIdAndUpdate(user.id, user, { new: true }).exec();
  }

  
  async findById(id: number): Promise<User | null> {
    return this.userModel.findOne({ id }).exec();
  }
}

