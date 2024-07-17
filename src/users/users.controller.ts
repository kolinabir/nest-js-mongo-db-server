import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

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
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const findUser = await this.userService.getUserById(id);
    if (!findUser) {
      throw new HttpException('User Not Found', 404);
    }
    return findUser;
  }

  @Get('name/:name')
  async getUserByUserName(@Param('name') name: string) {
    const user = await this.userService.getUserByUserName(name);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const _id = id;
    const updateUser = await this.userService.updateUser(_id, updateUserDto);
    return updateUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    return await this.userService.deleteUser(id);
  }
}
