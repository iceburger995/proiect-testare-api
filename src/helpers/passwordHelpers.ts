import { compare, hash } from 'bcrypt';

const SALT_ROUNDS = 16;

export function hashPassword(pass: string): Promise<string> {
  return hash(pass, SALT_ROUNDS);
}

export function comparePassword(pass: string, userPass: string): Promise<boolean> {
  return compare(pass, userPass);
}
