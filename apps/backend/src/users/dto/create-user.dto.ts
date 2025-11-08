// src/users/dto/create-user.dto.ts
export class CreateUserDto {
  username: string;
  email: string;
  role: 'admin' | 'user';
}
