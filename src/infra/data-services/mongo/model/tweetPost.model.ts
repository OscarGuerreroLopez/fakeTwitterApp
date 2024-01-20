import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TweetPostDocument = TweetPost & Document;

@Schema()
export class TweetPost {
  @Prop({ unique: true, type: String, required: true })
  hashtag: string;

  @Prop()
  properties: {
    tweetId: string;
    content: string;
    createdAt: Date;
    hashtags: string[];
  }[];
}

export const TweetPostSchema = SchemaFactory.createForClass(TweetPost);
