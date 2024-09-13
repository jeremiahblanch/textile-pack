'use strict';

import TextilePack from './TextilePack.class';
import { Box, Item, PackingOptions, PackingResult } from './types';

export function packItems(
  items: Item[],
  { maxWidth = Infinity }: PackingOptions = {},
): PackingResult {
  const boxes: Box[] = items
    .map((item) => {
      validateItem(item, maxWidth);
      return { width: item.width, height: item.height, item: item };
    })
    // sorting by height first is better.
    .sort((a, b) => b.height - a.height); // sort by height always

  const packer = new TextilePack({ maxWidth });
  const packedBoxes = packer.fit(boxes);

  // TODO - these 2 values could be worked out within packer
  const finishedWidth = packedBoxes.reduce((curr, item) => {
    return Math.max(curr, (item.x ?? 0) + item.width);
  }, 0);

  const finishedHeight = packedBoxes.reduce((curr, item) => {
    return Math.max(curr, (item.y ?? 0) + item.height);
  }, 0);

  return {
    width: finishedWidth,
    height: finishedHeight,
    items: boxes,
  };
}

function validateItem(item: Item, maxWidth: number) {
  if (!(item.width > 0 && item.width <= maxWidth)) {
    throw new Error(
      `Item width of ${item.width} is invalid. It must be > 0 and <= ${maxWidth}`,
    );
  }
  if (item.height <= 0) {
    throw new Error(`Item height of ${item.height} is invalid. It must be > 0`);
  }
}
