import { uniq } from '../../src/libs/utils';

describe('uniq2 test', () => {
  test('case1', () => {
    const arr = [1, 2, 2, 3, 4, 5];
    expect(uniq(arr)).toEqual([1, 2, 3, 4, 5]);
  });
});