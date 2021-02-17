---
eleventyNavigation:
  key: Config.fps
  parent: Config
title: Config.fps - Pixelize
---

```js
import { createGame } from "pixelize-engine";

const game = createGame({
  fps: 100, // 100 fps
});
```

`Config.fps` sets the [`Game`](/docs/game)s (attempted) frames per second. Defaults to `60`.
