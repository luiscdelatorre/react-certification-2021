import { loginApi } from './login.api';

describe('Login Api', () => {
  it('should throw an error with wrong credentials', () => {
    expect(() => loginApi('foo', 'Rocks!').toThrow('Username or password invalid'));
  });

  it('should return user data', (done) => {
    loginApi('wizeline', 'Rocks!')
      .then((user) => {
        expect(user.name).toBe('Wizeline');
        done();
      })
      .catch(done);
  });
});
