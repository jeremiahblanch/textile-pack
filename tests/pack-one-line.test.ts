import { PackedItem, TextilePack } from '../src';
import { SuppliedItem, PackingResult } from '../src';

interface TestCase {
  maxWidth: number;
  blocks: [number, number][];
}

const tp = new TextilePack();

function verifyOneLine(result: PackingResult, items: PackedItem[]): void {
  // result.height should be equal to largest height in items
  const largestHeight = items.reduce(
    (highest, item) => (item.height > highest ? item.height : highest),
    0,
  );
  expect(result.height).toBeCloseTo(largestHeight, 4);
}

describe('textile-bin-pack: Given 2 rectangles of equal height but differing width, where total width <= maxWidth, puts both side by side.', function () {
  const testCases: TestCase[] = [
    {
      maxWidth: 350,
      blocks: [
        [195, 101],
        [143, 102],
      ],
    },
    {
      maxWidth: 35,
      blocks: [
        [20, 10],
        [15, 10],
      ],
    },
    {
      maxWidth: 4000,
      blocks: [
        [3000, 1000],
        [1000, 1000],
      ],
    },
    {
      maxWidth: 35,
      blocks: [
        [19, 10],
        [14, 10],
      ],
    },
    {
      maxWidth: 35,
      blocks: [
        [19.5, 10.1],
        [14.3, 10.2],
      ],
    },
  ];

  testCases.forEach(({ maxWidth, blocks }) => {
    const description =
      blocks.map(([w, h]) => `${w}x${h}`).join(', ') + ` within ${maxWidth}`;

    it(description, function () {
      const items: SuppliedItem[] = blocks.map(([width, height]) => ({
        width,
        height,
      }));

      const result = tp.pack(items, maxWidth);

      expect(result.packedItems).toBeDefined();
      expect(result.packedItems.length).toEqual(blocks.length);
      verifyOneLine(result, result.packedItems);
    });
  });
});
