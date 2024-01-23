import { Facebook } from './facebook';
import { Tweet } from './tweet';

export type TweetEventHandler = (payload: Tweet) => Promise<void>;
export type FacebookEventHandler = (payload: Facebook) => Promise<void>;
