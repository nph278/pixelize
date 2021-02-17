---
eleventyNavigation:
  key: Game.sprite
  parent: Sprites
title: Game.sprite - Pixelize
---

```js
game.draw = () => {
  game.sprite(playerSprite, 10, 10);
};
```

`Game.sprite` draws an [`AnimationSprite`](/docs/sprite) to the screen. It is intended to be run inside [`Game.draw`](/docs/game/draw).

Parameters:

- `sprite`: an [`AnimationSprite`](/docs/sprite)
- `x`
- `y`
