import { User } from '../../src/application/entities/user/user';
import { UserRepository } from '../../src/application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  constructor() {
    this.users = [];
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
