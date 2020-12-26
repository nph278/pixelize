const keymap = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  space: " ",
};
class Game {
  constructor(ctx, size) {
    this.ctx = ctx;
    this.size = size;
    this.sprites = {};
    this.update = () => {};
    this.draw = () => {};
    this.time = 0;
    this.keys = {};
    setInterval(() => {
      this.update();
      this.ctx.clearRect(0, 0, this.size, this.size);
      this.draw();
      this.time++;
    }, 33);
  }
  key(key) {
    return !!this.keys[key in keymap ? keymap[key] : key];
  }
  addSprite(name, sprite) {
    let ready = 0;
    const arr = sprite.split(".");
    let newarr = [];
    arr.forEach((e, i) => {
      !ready && newarr.push(arr.slice(i, i + 8));
      ready++;
      ready %= 8;
    });
    this.sprites[name] = newarr;
  }
  sprite(name, x, y) {
    const sprite = this.sprites[name];
    sprite.forEach((row, x1) =>
      row.forEach((color, y1) => {
        if (color !== "") {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(
            (Math.floor(x + x1) * this.size) / 100,
            (Math.floor(y + y1) * this.size) / 100,
            this.size / 100,
            this.size / 100
          );
        }
      })
    );
  }
  sound(file) {
    const audio = new Audio(`${file}.mp3`);
    audio.play();
  }
}

const setUpGame = (window) => {
  let size =
    Math.floor(Math.min(window.innerHeight, window.innerWidth) / 100) * 100;
  window.document.body.style.margin = 0;
  window.document.body.style.overflow = "hidden";
  window.document.body.style.display = "flex";
  window.document.body.style.background = "black";
  window.document.body.style.justifyContent = "center";
  window.document.body.style.alignItems = "center";
  window.document.body.innerHTML = `
    <canvas width="${size}"  height="${size}" id="canvas" style="border:white solid 2px" />
  `;
  const ctx = window.document.getElementById("canvas").getContext("2d");
  const game = new Game(ctx, size);
  window.addEventListener("keydown", ({ key }) => {
    game.keys[key] = true;
  });
  window.addEventListener("keyup", ({ key }) => {
    game.keys[key] = false;
  });
  window.addEventListener("resize", () => {
    size =
      Math.floor(Math.min(window.innerHeight, window.innerWidth) / 100) * 100;
    window.document.querySelector("canvas").width = size;
    window.document.querySelector("canvas").height = size;
    game.size = size;
  });
  return game;
};
