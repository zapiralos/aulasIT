import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsNumber, IsOptional, IsISO8601 } from 'class-validator';
import { capitalizeFirstLetter } from '../utils/functions';

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
    password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
    confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => {
    value.trim();
    value = capitalizeFirstLetter(value);
    return value;
  })
    firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Transform(({ value }) => {
    value.trim();
    value = capitalizeFirstLetter(value);
    return value;
  })
    lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
    email: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.trim())
    confirmEmail: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
    address: string;

  @IsNumber()
  @IsNotEmpty()
    phoneNumber: number;

  @IsISO8601()
  @IsNotEmpty()
    birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
    guardian: string;

  @IsNumber()
  @IsOptional()
    positionId?: number | null;

  @IsNumber()
  @IsOptional()
    areaId?: number | null;

  @IsNumber()
  @IsOptional()
    socialWellfareId?: number | null;
}

export class UserUpdateDTO {
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(100)
    password: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(100)
    confirmPassword: string;

  @IsString()
  @IsOptional()
    oldPassword: string;

  @Transform(data => data.value === '' ? null : data.value)
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.trim())
    email: string;

  @Transform(data => data.value === '' ? null : data.value)
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.trim())
    confirmEmail: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
    address: string;

  @IsNumber()
  @IsOptional()
  @MaxLength(15)
    phoneNumber: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
    guardian: string;
}
