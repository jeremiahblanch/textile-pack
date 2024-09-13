'use strict';

import { Block, Space, TextilePackOptions } from './types';

export class TextilePack {
  private maxWidth: number;
  private maxHeight: number;
  private root!: Space;

  constructor({ maxWidth = Infinity }: TextilePackOptions = {}) {
    this.maxWidth = maxWidth;
    this.maxHeight = Infinity;
  }

  fit(givenBlocks: Block[]): Block[] {
    const len = givenBlocks.length;
    if (len === 0) {
      return [];
    }

    const blocks = [...givenBlocks];
    const width = this.maxWidth;
    const height = blocks[0].height;

    this.root = { x: 0, y: 0, width, height };

    for (let n = 0; n < len; n++) {
      const block = blocks[n];
      const node = this.findSpace(this.root, block.width, block.height);
      const fit = node
        ? this.splitSpace(node, block.width, block.height)
        : this.growSpace(block.width, block.height);

      if (fit) {
        block.x = fit.x;
        block.y = fit.y;
      }
    }

    return blocks;
  }

  private findSpace(root: Space, width: number, height: number): Space | null {
    if (root.used) {
      return (
        this.findSpace(root.right!, width, height) ||
        this.findSpace(root.down!, width, height)
      );
    } else if (width <= root.width && height <= root.height) {
      return root;
    } else {
      return null;
    }
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
    } else {
      return null;
    } // need to ensure sensible root starting size to avoid this happening
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
    } else {
      return null;
    }
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
}

export default TextilePack;
