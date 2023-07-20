import { IsOptional, IsString, IsNumber, Min, Max, IsEmail, IsPhoneNumber, IsPostalCode, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {

  
  @IsNotEmpty()
  @IsNumber()
   id :number;
  
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(70)
  age: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  phone?: string;

  @IsOptional()
  @IsPostalCode('IN')
  postal_code?: string;
}
