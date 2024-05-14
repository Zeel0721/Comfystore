import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  hashedRt?: string;
}

export const UserModel = SchemaFactory.createForClass(User);
