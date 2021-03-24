import { loginApi } from './login.api';

describe('/Login Api', () => {
  it('should throw and error', async () => {
    await loginApi().catch((e) => {
      expect(e.message).toBe('Username or password invalid');
    });
  });
  it('should throw and error', async () => {
    await loginApi('wizeline', 'Rocks!').then((user) => {
      expect(user.name).toBe('Wizeline');
    });
  });
});
