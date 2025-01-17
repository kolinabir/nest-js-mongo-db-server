import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;
  @Prop({ required: false })
  displayName: string;
  @Prop({ required: false })
  avatarUrl: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
