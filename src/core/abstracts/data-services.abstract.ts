import { Post } from '../entities';
import { GenericRepo } from './generic-repo.abstract';

export abstract class DataServices {
  abstract posts: GenericRepo<Post>;
}
