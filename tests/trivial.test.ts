import { TextilePack } from '../src';

const tp = new TextilePack();

test('Tests work', () => {
  expect(3).toStrictEqual(3);
});

test('Has a fit method', () => {
  expect(tp.pack).toBeDefined();
});
