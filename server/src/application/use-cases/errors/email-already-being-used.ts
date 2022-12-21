export class EmailAlreadyBeingUsed extends Error {
  constructor() {
    super('This email is already being used.');
  }
}
