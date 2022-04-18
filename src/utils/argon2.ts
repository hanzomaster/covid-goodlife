import * as argon2 from 'argon2';

export const encodedPassword = async (password: string): Promise<string> => {
  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
  });
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, password);
};
