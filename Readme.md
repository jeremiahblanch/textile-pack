# textile-pack

Typescript implementation of the binary tree bin-packing algorithm optimized for problems where the width is fixed but the height is not, such as cutting pieces out of textiles like carpet.

Pass it:

1. an array of items that each have a numeric `height` and `width`, and
1. a `width` value for the containing piece

and it will return a cutting plan and dimensions for the smallest containing piece possible.

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

// Find the cutting plan for a width of 4
const { height, width, packedItems } = packItemsIntoWidth(items, 4);

// height and width will be the overall dimensions needed to fit all the items

// packedItems will be an array of objects like
  {
    item: {} // the original item,
    height: 5, // height of the item
    width: 2, // width of the item
    x: 0, // x position in the layout
    y: 0, // y position in the layout
  },


/*
For this example, the returned layout will be

x ________2________4
y|        |        |
 |   p1   |   p2   |
3|        |________|
 |        |   p3   |
5|________|________|

*/
```

# Acknowledgements

Builds on top of [this code][enochriese] by Enoch Riese, [this code][bryanburgers] by Bryan Burgers, and [this code][jakesgordon] by Jake Gordon.

[enochriese]: https://github.com/eriese/bin-pack-with-constraints
[jakesgordon]: https://github.com/jakesgordon/bin-packing
[post]: http://codeincomplete.com/posts/2011/5/7/bin_packing/
[bryanburgers]: https://github.com/bryanburgers/bin-pack
