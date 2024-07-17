import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.userService.getUserById(id);
    if (!findUser) {
      throw new HttpException('User Not Found', 404);
    }
    return findUser;
  }
}
