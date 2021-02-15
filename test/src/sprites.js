import { Game } from "../../dist/index";

const game = new Game({
  fps: 60,
});

game.addSprite(
  "shipright",
  "#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00..#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00....#ce2a00.#041ece.#041ece.#ce2a00.....#ce2a00.#041ece.#041ece.#ce2a00.....#ce2a00.#ce2a00.#ce2a00.#ce2a00......#ce2a00.#ce2a00.......#ce2a00.#ce2a00..."
);
game.addSprite(
  "shipup",
  "......#ce2a00.#ce2a00......#ce2a00.#ce2a00.#ce2a00...#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#041ece.#041ece.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#041ece.#041ece.#ce2a00.#ce2a00.#ce2a00...#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00......#ce2a00.#ce2a00.#ce2a00.......#ce2a00.#ce2a00"
);
game.addSprite(
  "shipleft",
  "...#ce2a00.#ce2a00.......#ce2a00.#ce2a00......#ce2a00.#ce2a00.#ce2a00.#ce2a00.....#ce2a00.#041ece.#041ece.#ce2a00.....#ce2a00.#041ece.#041ece.#ce2a00....#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00..#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00"
);
game.addSprite(
  "shipdown",
  "#ce2a00.#ce2a00.......#ce2a00.#ce2a00.#ce2a00......#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00...#ce2a00.#ce2a00.#ce2a00.#041ece.#041ece.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#041ece.#041ece.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00.#ce2a00...#ce2a00.#ce2a00.#ce2a00......#ce2a00.#ce2a00......"
);
game.addSprite(
  "box",
  "#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.......#ce2ade.#ce2ade.......#ce2ade.#ce2ade.......#ce2ade.#ce2ade.......#ce2ade.#ce2ade.......#ce2ade.#ce2ade.......#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade.#ce2ade"
);
game.addSprite(
  "bulletv",
  ".........................#dea700.#ded000.#dea700.#ded000.#dea700.#ded000...#ded000.#dea700.#ded000.#dea700.#ded000.#dea700........................."
);
game.addSprite(
  "bulleth",
  "...........#ded000.#dea700.......#dea700.#ded000.......#ded000.#dea700.......#dea700.#ded000.......#ded000.#dea700.......#dea700.#ded000..........."
);

export default game;
