# pixelize

A pixely 2d game framework

## Please submit a pull request if you can make the mobile version look good

## Tutorial

You can create a new game with `npx degit nph278/pixelize-template game-name`, then running `npm i` in that directory.

You can start developing with "npm run dev", and you can create a production build with "npm run build".

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

## Animations

You can create a animation with `const animationName = game.animation(["sprite1", "sprite2"...], speed)` outside of `game.draw`. Speed defaults to one.

You can print that animation with `game.sprite(game.animate(animationName), x, y)`.

## Config

You can configure parts of the game with the second argument to `setUpGame`, `config`. `config` is an object with all of the configurations set.

### `excludeButtons`

This is an array of buttons (`x, y, up, down, left, right`) that will be excluded fron the mobile version. Defaults to `[]`.

### `pauseKey`

This is the key the user will press to pause the game. defaults to `"Escape"`.

### `fps`

The game's frames per second. Defaults to `30`.
