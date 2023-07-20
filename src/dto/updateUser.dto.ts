import { IsOptional, IsString, IsNumber, Min, Max, IsEmail, IsPhoneNumber, IsPostalCode, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {

  
  @IsNotEmpty()
  @IsNumber()
  readonly id :number;
  
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(70)
  readonly age: number;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsPhoneNumber('IN')
  readonly phone?: string;

  @IsOptional()
  @IsPostalCode('IN')
  readonly postal_code?: string;
}
