export type TestCase = {
  blocks: [number, number][];
  maxWidth: number;
  expectedHeight?: number;
  expectedWidth?: number;
};
