---
eleventyNavigation:
  key: Game.update
  parent: Games
title: Game.update - Pixelize
---

```js
game.update = () => {
  // Update Game
};
```

`Game.update` is called every frame after a [`Game`](/docs/game) is [`mounted`](/docs/game/mount). It is called before the screen is cleared, and before [`Game.draw`](/docs/game/draw).
