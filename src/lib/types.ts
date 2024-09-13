export type Box = {
  height: number;
  width: number;
};

export type BoxWithPos = Box & {
  x: number;
  y: number;
};

export type PackedItem = BoxWithPos & {
  item: SuppliedItem;
};

export type Options = {
  maxWidth?: number;
};

export type PackingResult = {
  width: number;
  height: number;
  packedItems: PackedItem[];
};

export type Space = BoxWithPos & {
  used?: boolean;
  right?: Space;
  down?: Space;
};

export type SuppliedItem = {
  width: number;
  height: number;
  [key: string]: unknown; // Allow for additional properties
};

export type WorkingItem = BoxWithPos & {
  item: SuppliedItem;
  index: number;
};
