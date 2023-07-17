import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{

    @Prop({ required: true, unique: true })
    id:number;

    @Prop()
    name:string;
    
    @Prop()
    age:number;

    @Prop()
    email:string;

    @Prop()
    phone:string;

    @Prop()
    postal_code:string;

}

export const UserSchema = SchemaFactory.createForClass(User)