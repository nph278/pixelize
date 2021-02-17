---
eleventyNavigation:
  key: Config.pauseKey
  parent: Config
title: Config.pauseKey - Pixelize
---

```js
import { createGame } from "pixelize-engine";

const game = createGame({
  pauseKey: "p", // 100 fps
});
```

`Config.pauseKey` sets the key that will pause the game. Defaults to `"Escape"`.
