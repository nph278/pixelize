---
layout: layout.njk
title: Config.excludeButtuns - Pixelize
---

[Home](/) | [Docs Home](/docs) | [Config](/docs/config)

```js
import { createGame } from "pixelize-engine";

const game = createGame({
  excludeButtons: ["x", "up"], // 100 fps
});
```

`Config.excludeButtons` sets the buttons that will be removed from the mobile version of the game.
