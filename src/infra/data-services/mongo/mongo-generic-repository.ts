import { Model } from 'mongoose';
import { GenericRepo } from '../../../core';

export class MongoGenericRepository<T> implements GenericRepo<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  create(data: T): Promise<T> {
    return this._repository.create(data);
  }

  findAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  findOne(id: string): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }

  update(id: string, data: T): Promise<T> {
    return this._repository.findByIdAndUpdate(id, data);
  }

  delete(id: string): Promise<T> {
    return this._repository.findByIdAndDelete(id);
  }
}
