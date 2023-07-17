import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { GoogleSheetsService } from './google-sheets.service';



@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService, GoogleSheetsService ]
})
export class UserModule {}
