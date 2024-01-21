import { Model } from 'mongoose';
import { GenericRepo } from '../../../core';

export class MongoGenericRepository<T> implements GenericRepo<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  create(data: T): Promise<T> {
    return this._repository.create(data);
  }

  findAll(): Promise<T[]> {
    return this._repository.find().exec();
  }

  findOne(id: string): Promise<T> {
    return this._repository.findById(id).exec() as Promise<T>;
  }

  update(id: string, data: Partial<T>): Promise<T> {
    return this._repository.findByIdAndUpdate(id, data);
  }

  delete(id: string): Promise<T> {
    return this._repository.findByIdAndDelete(id);
  }

  findByHashtag(value: string): Promise<T> {
    return this._repository.findOne({ hashtag: value }).exec();
  }
}
