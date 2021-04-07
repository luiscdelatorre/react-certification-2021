import SessionDataReducer from './SessionData.reducer';

describe('SessionData reducer', () => {
  it('test default case on SessionDataReducer', () => {
    const state = { foo: 'bar' };
    expect(SessionDataReducer(state, 'BAZ')).toBe(state);
  });
});
