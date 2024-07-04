import { Demo } from '../src';
describe('Index Package', () => {
  it('should work', () => {
    const response = new Demo().getIt();

    expect(response).toBe('test');
  });
});
