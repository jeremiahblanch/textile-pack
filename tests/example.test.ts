import { packItemsIntoWidth } from '../src';
import type { PackedItem, SuppliedItem, PackingResult } from '../src';
import type { TestCase } from './types';

describe('Given 3 rectangles, finds the smallest plan', function () {
  const testCases: TestCase[] = [
    {
      blocks: [
        [2, 3],
        [2, 3],
        [4, 2],
      ],
      maxWidth: 4,
      expectedHeight: 5,
      expectedWidth: 4,
    },
    {
      blocks: [
        [2, 5],
        [2, 3],
        [2, 2],
      ],
      maxWidth: 4,
      expectedHeight: 5,
      expectedWidth: 4,
    },
  ];

  testCases.forEach(({ maxWidth, blocks, expectedHeight, expectedWidth }) => {
    const description =
      blocks.map(([w, h]) => `${w}x${h}`).join(', ') + ` within ${maxWidth}`;

    it(description, function () {
      const items: SuppliedItem[] = blocks.map(([width, height]) => ({
        width,
        height,
      }));

      const result = packItemsIntoWidth(items, maxWidth);

      console.log(JSON.stringify(result));

      expect(result.packedItems).toBeDefined();
      expect(result.packedItems.length).toEqual(blocks.length);
      expect(result.height).toEqual(expectedHeight);
      expect(result.width).toEqual(expectedWidth);
    });
  });
});
