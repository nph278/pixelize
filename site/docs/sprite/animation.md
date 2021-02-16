---
layout: layout.liquid
title: animation - Pixelize
---

[Home](/) | [Docs Home](/docs) | [Sprites](/docs/sprite)

```js
import { animation } from "pixelize-engine";

const sprite1 = animation("code1");
const sprite2 = animation(["code1", "code2"]);
const sprite3 = animation(["code1", "code2"], 4);
```

`animation` creates a new [`AnimationSprite`](/docs/sprite). It should be run once, outside of the [`Game`](/docs/game) methods. The sprite code(s) can be generated at [sprite editor](/editor).

Parameters:

- `spritecode`: A code or array of codes.
- `interval`: The interval in frames. Defaults to 1.
