---
eleventyNavigation:
  key: Game.mount
  parent: Games
title: Game.mount - Pixelize
---

```js
game.update(document.body); // Mounts game to the body
```

`Game.mount` mounts a [`Game`](/docs/game) to an element in the DOM. This should be done after the [`update`](/docs/game/update) and [`draw`](/docs/game/draw) methods are set.

Paramaters:

- `element`: An `HTMLElement` to mount the game in.
