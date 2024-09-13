export interface Item {
  width: number;
  height: number;
  [key: string]: unknown; // Allow for additional properties
}

export interface Box extends Item {
  item: Item;
  x?: number;
  y?: number;
}

export interface PackingOptions {
  maxWidth?: number;
}

export interface PackingResult {
  width: number;
  height: number;
  items: Box[];
}

export interface Block {
  width: number;
  height: number;
  x?: number;
  y?: number;
}

export interface Space {
  x: number;
  y: number;
  width: number;
  height: number;
  used?: boolean;
  right?: Space;
  down?: Space;
}

export interface TextilePackOptions {
  maxWidth?: number;
}
