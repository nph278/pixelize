# pixelize

A pixely 2d game engine

## Tutorial

You can create a new game with `npx degit nph278/pixelize-template game-name`, then running `npm i` in that directory.

## Updating

The game updates by calling `game.update`, then clears the screen, then `game.draw`.

### Sprites

You can add a sprite with `game.addSprite("name", "sprite code")`. You can generate the sprite code at [the editor](https://pixelizer.netlify.app/site/editor.html). You can draw a sprite with `game.sprite("name", x, y)`. The game window is 100 by 100 game pixels. Each sprite is eight by eight;

## Sounds

You can play a sound with `game.sound("filename")` where `filename` is the path to an mp3 file, without the `.mp3` extension.

## Key presses

You can check if a key is pressed with `game.key("key name")`. Key name could be up, down, left, or right for arrow keys, or a letter, number or `space`.

## Text

You can print text to the screen with `game.text("text", x, y, "color")`. The default color is white.
