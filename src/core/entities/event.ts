import { Tweet } from './tweet';

export type EventHandler = (payload: Tweet) => Promise<void>;
