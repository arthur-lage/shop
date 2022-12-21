import { User } from '../entities/user/user';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User>;
  abstract create(user: User): Promise<void>;
}
