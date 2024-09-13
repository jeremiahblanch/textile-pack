export type Box2D = {
  height: number;
  width: number;
  x?: number;
  y?: number;
};

export type FittedItem = Box2D & {
  item: SuppliedItem;
};

export type Options = {
  maxWidth?: number;
};

export type PackingResult = {
  width: number;
  height: number;
  fittedItems: FittedItem[];
};

export type Space = Box2D & {
  used?: boolean;
  right?: Space;
  down?: Space;
};

export type SuppliedItem = {
  width: number;
  height: number;
  [key: string]: unknown; // Allow for additional properties
};
