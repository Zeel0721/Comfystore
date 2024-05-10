import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  company: string;
  @Prop()
  price: number;
  @Prop()
  description: string;
  @Prop()
  colors: [];
  @Prop()
  category: [];
  @Prop()
  image: Blob;
}
export const ProductModel = SchemaFactory.createForClass(Product);
