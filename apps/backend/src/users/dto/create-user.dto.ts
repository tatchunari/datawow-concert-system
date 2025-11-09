import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @Length(3, 30, { message: 'Username must be between 3 and 30 characters' })
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsEnum(['admin', 'user'], { message: 'Role must be either admin or user' })
  role: 'admin' | 'user';
}
