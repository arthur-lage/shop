import { LoginUseCase } from './login-use-case';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { UserNotFound } from '../errors/user-not-found';
import { RegisterUseCase } from '../register/register-use-case';
import { InvalidCredentials } from '../errors/invalid-credentials';

describe('Login', () => {
  it('should be able to login an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);
    const loginUseCase = new LoginUseCase(userRepository);

    await registerUseCase.execute({
      name: 'Name',
      email: 'example@gmail.com',
      password: 'pass123',
    });

    expect(
      await loginUseCase.execute({
        email: 'example@gmail.com',
        password: 'pass123',
      }),
    ).toEqual(expect.objectContaining({ token: 'token' }));
  });

  it('should not be able to login an user that does not exist', async () => {
    const userRepository = new InMemoryUserRepository();
    const loginUseCase = new LoginUseCase(userRepository);

    expect(() => {
      return loginUseCase.execute({
        email: 'unexistentemail@gmail.com',
        password: 'anypass123',
      });
    }).rejects.toThrow(UserNotFound);
  });

  it('should not be able to login user with the wrong password', async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);
    const loginUseCase = new LoginUseCase(userRepository);

    await registerUseCase.execute({
      name: 'Name',
      email: 'example@gmail.com',
      password: 'pass123',
    });

    expect(() => {
      return loginUseCase.execute({
        email: 'example@gmail.com',
        password: 'pass1234',
      });
    }).rejects.toThrow(InvalidCredentials);
  });
});
