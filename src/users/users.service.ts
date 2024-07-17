import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, set } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}
  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const saveNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: saveNewSettings._id,
      });
      return await newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getAllUser() {
    const allUser = this.userModel.find().populate('settings');
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
