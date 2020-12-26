let x = 0;
let y = 0;
let boxes = [];
let bullets = [];
for (let i = 0; i < 5; i++) {
  boxes.push([
    Math.random() * 92,
    Math.random() * 92,
    Math.random() * 4 - 2,
    Math.random() * 4 - 2,
  ]);
}
let direction = "up";
let z = true;
game.update = () => {
  if (game.key("right")) {
    direction = "right";
    x++;
  }
  if (game.key("left")) {
    direction = "left";
    x--;
  }
  if (game.key("up")) {
    direction = "up";
    y--;
  }
  if (game.key("down")) {
    direction = "down";
    y++;
  }
  if (game.key("z")) {
    if (z) {
      game.sound("sounds/shoot");
      bullets.push([x, y, direction]);
      z = false;
    }
  } else {
    z = true;
  }
  boxes = boxes.map(([x2, y2, x3, y3]) => {
    if (x2 <= 0 || x2 >= 92) {
      x3 = -x3;
      game.sound("sounds/chirp");
    }
    if (y2 <= 0 || y2 >= 92) {
      y3 = -y3;
      game.sound("sounds/chirp");
    }
    x2 += x3;
    y2 += y3;
    return [x2, y2, x3, y3];
  });
  bullets = bullets.map(([x2, y2, d]) => {
    if (d === "up") {
      y2 -= 2;
    }
    if (d === "down") {
      y2 += 2;
    }
    if (d === "left") {
      x2 -= 2;
    }
    if (d === "right") {
      x2 += 2;
    }
    return [x2, y2, d];
  });
  boxes.forEach(([bx, by], i) => {
    if (
      bullets.some(
        (b) =>
          (["up", "down"].includes(b[2]) ? b[0] + 5 : b[0] + 7) >= bx &&
          (["up", "down"].includes(b[2]) ? b[0] + 3 : b[0] + 1) <= bx + 8 &&
          (["left", "right"].includes(b[2]) ? b[1] + 5 : b[1] + 7) >= by &&
          (["left", "right"].includes(b[2]) ? b[1] + 3 : b[1] + 1) <= by + 8
      )
    ) {
      game.sound("sounds/no");
      boxes.splice(i, 1);
      boxes.push([
        Math.random() * 92,
        Math.random() * 92,
        Math.random() * 4 - 2,
        Math.random() * 4 - 2,
      ]);
    }
  });
};

game.draw = () => {
  game.sprite("ship" + direction, x, y);
  boxes.forEach(([x2, y2]) => {
    game.sprite("box", x2, y2);
  });
  bullets.forEach(([x2, y2, direction]) => {
    game.sprite(
      ["up", "down"].includes(direction) ? "bulletv" : "bulleth",
      x2,
      y2
    );
  });
};
