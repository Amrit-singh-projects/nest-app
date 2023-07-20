import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

const db = "mongodb+srv://aksingh:nestapp@cluster0.9hrwmja.mongodb.net/crud-nest-app?retryWrites=true&w=majority";



@Module({
  imports: [
    
    UserModule,

    // CONNECTION WITH DATABASE
    MongooseModule.forRoot(db)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
