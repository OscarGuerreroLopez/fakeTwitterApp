export class TweetPost {
  hashtag: string;
  properties: {
    tweetId: string;
    content: string;
    createdAt: Date;
    hashtags: string[];
  }[];
  _id?: string;
}
