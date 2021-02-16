---
layout: layout.njk
title: Config.pauseKey - Pixelize
---

[Home](/) | [Docs Home](/docs) | [Config](/docs/config)

```js
import { createGame } from "pixelize-engine";

const game = createGame({
  pauseKey: "p", // 100 fps
});
```

`Config.pauseKey` sets the key that will pause the game. Defaults to `"Escape"`.
