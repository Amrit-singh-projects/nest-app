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
    
    // const skippedRows = 15;
    // const rowIndex = skippedRows;
    // const user = users[rowIndex];

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
    const userFromMongo = await this.userService.findById(updateUserDto.id);
    if (!userFromMongo) {
      throw new NotFoundException('User not found');
    }

    // Update the user object from MongoDB
    const updatedUser = await this.userService.update(userFromMongo, updateUserDto);

    // Update the user data in the Google Sheet
    await this.googleSheetsService.authenticate();
    await this.googleSheetsService.loadSpreadsheet();
    const rowToUpdate = await this.googleSheetsService.findRowByUserId(updatedUser.id);
    if (rowToUpdate) {
      await this.googleSheetsService.updateRowData(rowToUpdate, updatedUser);
      await this.googleSheetsService.saveChanges();
    }
     // Remove the updated values from the Google Sheets table
     if (rowToUpdate) {
      await this.googleSheetsService.deleteRow(rowToUpdate);
      await this.googleSheetsService.saveChanges();
    }

    return updatedUser;
  }

 
  
}



