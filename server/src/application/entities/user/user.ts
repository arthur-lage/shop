import { randomUUID } from 'crypto';

import { Replace } from '../../../helpers/Replace';

import * as argon2 from 'argon2';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>) {
    if (props.id) {
      this._id = props.id;
    } else {
      this._id = randomUUID();
    }

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(newName: string) {
    this.props.name = newName;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(newEmail: string) {
    this.props.email = newEmail;
  }

  public get password(): string {
    return this.props.password;
  }

  public async changePassword(newPassword: string) {
    const newPasswordHashed = await argon2.hash(newPassword);

    this.props.password = newPasswordHashed;
  }
}
