---
layout: layout.njk
title: Config - Pixelize
---

[Home](/) | [Docs Home](/docs)

```js
import { createGame } from "pixelize-engine";

creategame({
  fps: 30,
  excludeButtons: ["x"],
  pauseKey: "p",
});
```

`Config` is the second parameter to [`createGame`](/docs/game/creategame). It is used to cvonfigure how the [`Game`](/docs/game) runs.

- [`Config.fps`](/docs/config/fps)
- [`Config.pauseKey`](/docs/config/pausekey)
- [`Config.excludeButtons`](/docs/config/excludebuttons)
