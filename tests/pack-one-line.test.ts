import { packItemsIntoWidth } from '../src';
import type { SuppliedItem } from '../src';
import { areItemsOnOneLine, doAnyItemsIntersect } from './lib';

interface TestCase {
  maxWidth: number;
  blocks: [number, number][];
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

      const result = packItemsIntoWidth(items, maxWidth);

      expect(result.packedItems).toBeDefined();
      expect(result.packedItems.length).toEqual(blocks.length);
      expect(areItemsOnOneLine(result.packedItems, result.height)).toBeTruthy();
      expect(doAnyItemsIntersect(result.packedItems)).toBeFalsy();
    });
  });
});
