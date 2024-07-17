import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getAllUser() {
    const allUser = this.userModel.find();
    return allUser;
  }

  getUserByUserName(username: string) {
    const user = this.userModel.findOne({
      username,
    });
    return user;
  }

  getUserById(id: string) {
    return this.userModel.findById({
      _id: id,
    });
  }

  updateUser(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(_id, updateUserDto, { new: true });
  }

  deleteUser(_id: string) {
    return this.userModel.findByIdAndDelete(_id);
  }
}
