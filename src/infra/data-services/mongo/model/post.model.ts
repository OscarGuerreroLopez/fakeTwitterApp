import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  originId: string;

  @Prop()
  content: string;

  @Prop()
  hashtags: string[];

  @Prop()
  platform: string;

  @Prop()
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
