import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  toObject() {
    const { password, ...obj } = this.toObject();
    return obj;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashed = await bcrypt.hash(this['password'], 10);
  this['password'] = hashed;
  next();
});
