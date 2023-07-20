import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { User } from '../schema/user.schema';
import { GoogleSheetsService } from './google-sheets.service';
import { UpdateUserDto } from '../dto/updateUser.dto';



@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly googleSheetsService: GoogleSheetsService,
  ) {}

  @Get('/create_user')
  async create(createUserDto:CreateUserDto): Promise<User> {
    const createdUser = await this.userService.createUser(createUserDto);
    const newUser = await this.googleSheetsService.populateData([createdUser]);

    return createdUser;
  }

  @Get('/read_users')
  async findAll(): Promise<User[]> {

    const users = await this.userService.findAll();

    // Populate the sheet with the user's data
    await this.googleSheetsService.populateData(users);
    return users;

  }

  @Get('/delete_user/:id')
  async delete(@Param('id') id: number): Promise<User> {
    const deletedUser = await this.userService.delete(id);
    await this.googleSheetsService.removeData(id);
    return deletedUser;
  }

  @Post('/update_user')
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {

    const updatedUser = await  this.userService.updateUser(updateUserDto);
    
     // Populate the sheet with the user's data
     await this.googleSheetsService.populateData([updatedUser]);
    
     return updatedUser;
    
  } 
}



