---
eleventyNavigation:
  key: Config
  parent: Docs
---

# Config - Pixelize

```js
import { createGame } from "pixelize-engine";

creategame({
  fps: 30,
  excludeButtons: ["x"],
  pauseKey: "p",
});
```

`Config` is the second parameter to [`createGame`](/docs/game/creategame). It is used to cvonfigure how the [`Game`](/docs/game) runs.
