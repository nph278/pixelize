---
layout: layout.njk
title: Config.fps - Pixelize
---

[Home](/) | [Docs Home](/docs) | [Config](/docs/config)

```js
import { createGame } from "pixelize-engine";

const game = createGame({
  fps: 100, // 100 fps
});
```

`Config.fps` sets the [`Game`](/docs/game)s (attempted) frames per second. Defaults to `60`.
