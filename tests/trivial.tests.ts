import TextilePack from '../src';

const tp = new TextilePack({
  maxWidth: 10,
});

test('Tests work', () => {
  expect(3).toStrictEqual(3);
});

test('Has a fit method', () => {
  expect(tp.fit).toBeDefined();
});
