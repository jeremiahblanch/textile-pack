'use strict';

import { SuppliedItem, Space, PackingResult, WorkingItem } from './types';

export class TextilePack {
  private maxWidth: number;
  private maxHeight: number;
  private root!: Space;

  constructor({ maxWidth }: { maxWidth: number }) {
    this.maxWidth = maxWidth;
    this.maxHeight = Infinity;
  }

  pack(items: SuppliedItem[]): PackingResult {
    const len = items.length;
    if (len === 0) {
      return {
        height: 0,
        packedItems: [],
        width: 0,
      };
    }

    const workingItems: WorkingItem[] = items
      .map((item, index) => {
        this.validateItem(item);

        return {
          height: item.height,
          index,
          item,
          width: item.width,
          x: -1,
          y: -1,
        };
      })
      .sort(getHeightDiff);

    this.root = {
      x: 0,
      y: 0,
      width: this.maxWidth,
      height: workingItems[0].height,
    };

    const packedItems = Array(len); // we will places the results back here, in their original positions
    let furthestX = 0;
    let furthestY = 0;

    workingItems.forEach(({ height, index, item, width }) => {
      const spaceFoundWithin = this.findSpace(this.root, width, height);

      const space = spaceFoundWithin
        ? this.splitSpace(spaceFoundWithin, width, height)
        : this.growSpace(width, height);

      if (!space) {
        throw new Error(`Could no find space for item[${index}]`);
      }

      packedItems[index] = {
        item,
        height,
        width,
        x: space.x,
        y: space.y,
      };

      furthestX = Math.max(furthestX, space.x + width);
      furthestY = Math.max(furthestY, space.y + height);
    });

    return {
      height: furthestY,
      packedItems,
      width: furthestX,
    };
  }

  private findSpace(root: Space, width: number, height: number): Space | null {
    if (root.used) {
      return (
        this.findSpace(root.right!, width, height) ||
        this.findSpace(root.down!, width, height)
      );
    } else if (width <= root.width && height <= root.height) {
      return root;
    }
    return null;
  }

  private splitSpace(node: Space, width: number, height: number): Space {
    node.used = true;
    const downY = node.y + height;
    node.down = {
      x: node.x,
      y: downY,
      width: node.width,
      height: Math.min(node.height - height, this.maxHeight - downY),
    };

    const rightX = node.x + width;
    node.right = {
      x: rightX,
      y: node.y,
      width: Math.min(node.width - width, this.maxWidth - rightX),
      height: height,
    };
    return node;
  }

  private growSpace(width: number, height: number): Space | null {
    const canGrowDown = width <= this.root.width;
    const canGrowRight = height <= this.root.height;

    const proposedNewWidth = this.root.width + width;
    const shouldGrowRight = canGrowRight && this.maxWidth >= proposedNewWidth;
    const proposedNewHeight = this.root.height + height;
    const shouldGrowDown = canGrowDown && this.maxHeight >= proposedNewHeight;

    if (shouldGrowRight) {
      return this.growRight(width, height);
    } else if (shouldGrowDown) {
      return this.growDown(width, height);
    } else if (canGrowRight) {
      return this.growRight(width, height);
    } else if (canGrowDown) {
      return this.growDown(width, height);
    }
    return null;
  }

  private growRight(width: number, height: number): Space | null {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      width: this.root.width + width,
      height: this.root.height,
      down: this.root,
      right: {
        x: this.root.width,
        y: 0,
        width: width,
        height: this.root.height,
      },
    };
    const node = this.findSpace(this.root, width, height);
    if (node) {
      return this.splitSpace(node, width, height);
    }

    return null;
  }

  private growDown(width: number, height: number): Space | null {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      width: this.root.width,
      height: this.root.height + height,
      down: {
        x: 0,
        y: this.root.height,
        width: this.root.width,
        height: height,
      },
      right: this.root,
    };
    const node = this.findSpace(this.root, width, height);
    if (node) {
      return this.splitSpace(node, width, height);
    } else {
      return null;
    }
  }

  private validateItem(item: SuppliedItem): void {
    if (!(item.width > 0 && item.width <= this.maxWidth)) {
      throw new Error(
        `Item width of ${item.width} is invalid. It must be > 0 and <= ${this.maxWidth}`,
      );
    }
    if (item.height <= 0) {
      throw new Error(
        `Item height of ${item.height} is invalid. It must be > 0`,
      );
    }
  }
}

function getHeightDiff(a: SuppliedItem, b: SuppliedItem): number {
  return b.height - a.height;
}
