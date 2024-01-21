export abstract class GenericRepo<T> {
  abstract create(data: T): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: string): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<T>;
  abstract findByHashtag(value: string): Promise<T>;
}
