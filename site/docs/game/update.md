---
layout: layout.njk
title: Game.update - Pixelize
---

[Home](/) | [Docs Home](/docs) | [Games](/docs/game)

```js
game.update = () => {
  // Update Game
};
```

`Game.update` is called every frame after a [`Game`](/docs/game) is [`mounted`](/docs/game/mount). It is called before the screen is cleared, and before [`Game.draw`](/docs/game/draw).
