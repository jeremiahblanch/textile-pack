import { PackedItem } from '../src/lib/types';

function doItemsIntersect(item1: PackedItem, item2: PackedItem) {
  return [
    { x: item1.x, y: item1.y }, // Top left
    { x: item1.x + item1.width, y: item1.y }, // Top right
    { x: item1.x + item1.width, y: item1.y + item1.height }, // Bottom right
    { x: item1.x, y: item1.y + item1.height }, // Bottom left
  ].some((vertex) => {
    if (item2.x < vertex.x && vertex.x < item2.x + item2.width) {
      if (item2.y < vertex.y && vertex.y < item2.y + item2.height) {
        return true;
      }
    }
  });
}

export function doAnyItemsIntersect(items: PackedItem[]): boolean {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (i !== j && doItemsIntersect(items[i], items[j])) {
        return true;
      }
    }
  }
  return false;
}

export function areItemsOnOneLine(
  items: PackedItem[],
  resultHeight: number,
): boolean {
  // result.height should be equal to largest height in items
  const largestHeight = items.reduce(
    (highest, item) => (item.height > highest ? item.height : highest),
    0,
  );
  return Math.abs(resultHeight - largestHeight) < 0.0001;
}
