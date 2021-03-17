import OptionsReducer from './Options.reducer';

describe('Options reducer', () => {
  it('test default case on OptionsReducer', () => {
    const state = { foo: 'bar' };
    expect(OptionsReducer(state, 'BAZ')).toBe(state);
  });
});
