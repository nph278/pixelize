---
eleventyNavigation:
  key: Game.draw
  parent: Games
title: Game.draw - Pixelize
---

```js
game.draw = () => {
  // Draw Game Sprites
};
```

`Game.draw` is called every frame after a [`Game`](/docs/game) is [`mounted`](/docs/game/mount). It is called after the screen is cleared, and after [`Game.update`](/docs/game/update).

Sprites can be drawn to the sceen with [`Game.sprite`](/docs/sprite/gamesprite)
