import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ required: true, unique: true })
  carId: string;

  @Prop({ required: true, unique: true })
  name: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
