import { IsNotEmpty, IsString, IsNumber, IsEmail, IsPhoneNumber, IsPostalCode, Min, Max, MinLength } from 'class-validator';


export class CreateUserDto {

  @IsNumber()
  readonly id :number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(18)
  @Max(70)
  readonly age: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(15)
  @IsPhoneNumber('IN') // 'ZZ' represents the country code, e.g., 'IN' for India
  readonly phone: string;

  @IsNotEmpty()
  @IsPostalCode('IN') // 'ZZ' represents the country code, e.g., 'IN' for India
  readonly postal_code: string ;

}