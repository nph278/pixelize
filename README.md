# pixelize

A pixely 2d game engine

`npm install pixelize-engine`

## Tutorial

You can install pixelize with `npm install pixelize-engine`.
You can start using it with:

```html
<script src="node_modules/pixelize-engine/src/index.js"></script>
```

And then initializing you game with:

```html
<script>
  const game = setUpGame(window);
  // Code goes here...
</script>
```

The game updatees by calling `game.update`, then clears the screen, then `game.draw`.

### Sprites

You can add a sprite with `game.addSprite("name", "sprite code")`. You can generate the sprite code at [the editor](https://pixelizer.netlify.app/site/editor.html). You can draw a sprite with `game.sprite("name", x, y)`. The game window is 100 by 100 game pixels. Each sprite is eight by eight;

## Sounds

You can play a sound with `game.sound("filename")` where `filename` is the path to an mp3 file, without the `.mp3` extension.

## Key presses

You can check if a key is pressed with `game.key("key name")`. Key name could be up, down, left, or right for arrow keys, or a letter, number or `space`.
