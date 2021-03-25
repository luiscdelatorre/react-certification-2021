import { loginApi } from './login.api';

describe('/Login Api', () => {
  it('should throw an error with wrong credentials', async () => {
    await loginApi('foo', 'bar').catch((e) => {
      expect(e.message).toBe('Username or password invalid');
    });
  });
  it('should return user data', async () => {
    await loginApi('wizeline', 'Rocks!').then((user) => {
      expect(user.name).toBe('Wizeline');
    });
  });
});
