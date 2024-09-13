import { TextilePack } from './lib/TextilePack.class';
import { PackingResult, SuppliedItem } from './lib/types';

export function packItemsIntoWidth(
  items: SuppliedItem[],
  width: number,
): PackingResult {
  const tp = new TextilePack({ maxWidth: width });

  return tp.pack(items);
}

export * from './lib/types';
