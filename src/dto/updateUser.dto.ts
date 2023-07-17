import { IsOptional, IsString, IsNumber, Min, Max, IsEmail, IsPhoneNumber, IsPostalCode } from 'class-validator';

export class UpdateUserDto {

  
  @IsOptional()
  @IsNumber()
  readonly id :number;
  
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(70)
  age?: number;

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
