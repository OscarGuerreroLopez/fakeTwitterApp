import { Post, TweetPost } from '../entities';
import { GenericRepo } from './generic-repo.abstract';

export abstract class DataServices {
  abstract posts: GenericRepo<Post>;
  abstract tweetPosts: GenericRepo<TweetPost>;
}
