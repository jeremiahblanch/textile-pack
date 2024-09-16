# textile-pack

Typescript implementation of the binary tree bin-packing algorithm optimized for problems where the width is fixed but the height is not, such cutting pieces out of textiles.

Pass it an array of items that each have a numeric `height` and `width`, and a `width` value for the containing piece and it will return a cutting plan and dimensions for the smallest containgin piece possible.

I made this to find plans for cutting multiple pieces of carpet from a roll.

# Usage

```
npm install textile-pack
```

```typescript
import { packItemsIntoWidth } from 'textile-pack';

const items = [
  {
    id: 'p1',
    height: 5,
    width: 2,
  },
  {
    id: 'p2',
    height: 3,
    width: 2,
  },
  {
    id: 'p3',
    height: 2,
    width: 2,
  },
];

const { packedItems, height, width } = packItemsIntoWidth(items, 4); // width of 4

// packedItems will be an array of objects like
  {
      item: {} // the original item,
      height: 5,
      width: 2,
      x: 0, // x position in the layout
      y: 0, // y position in the layout
    },

// height and width will be the dimensions of the space needed to fit all the items

/* The layout will be

x ________2________4
y|        |        |
 |   p1   |   p2   |
3|        |________|
 |        |   p3   |
5|________|________|


*/


# Acknowledgements
Builds on top of work by [Enoch Riese][enochriese], [Jake Gordon][jakesgordon], [Bryan Burgers][bryanburgers]


[enochriese]: https://github.com/eriese/bin-pack-with-constraints
[jakesgordon]: https://github.com/jakesgordon/bin-packing
[post]: http://codeincomplete.com/posts/2011/5/7/bin_packing/
[bryanburgers]: https://github.com/bryanburgers/bin-pack
```
