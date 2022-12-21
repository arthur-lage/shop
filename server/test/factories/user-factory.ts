import { User } from '../../src/application/entities/user/user';

interface MakeUserProps {
  name?: string;
  email?: string;
  password?: string;
}

export function makeUser({
  name = 'Name',
  email = 'example@gmail.com',
  password = 'pass123',
}: MakeUserProps) {
  return new User({
    name,
    email,
    password,
  });
}
