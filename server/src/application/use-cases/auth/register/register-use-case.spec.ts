import { makeUser } from '../../../../test/factories/user-factory';
import { RegisterUseCase } from './register-use-case';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { EmailAlreadyBeingUsed } from '../errors/email-already-being-used';

describe('Register', () => {
  it('should be able to create a new user', async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const newUser = makeUser({});

    await registerUseCase.execute(newUser);

    expect(userRepository.users[0]).toEqual(
      expect.objectContaining({ name: 'Name', email: 'example@gmail.com' }),
    );
  });

  it('should not be able to create a new user with a email that is already being used', async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    await registerUseCase.execute({
      name: 'test123',
      email: 'test@gmail.com',
      password: 'pass123',
    });

    expect(() => {
      return registerUseCase.execute({
        name: 'test1234',
        email: 'test@gmail.com',
        password: 'pass1234',
      });
    }).rejects.toThrow(EmailAlreadyBeingUsed);
  });

  //   it('should not be able to create a new user without a name', () => {});

  //   it('should not be able to create a new user without an email', () => {});

  //   it('should not be able to create a new user without a password', () => {});
});
