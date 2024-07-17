import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsString()
  @IsOptional()
  displayName?: string;
}
