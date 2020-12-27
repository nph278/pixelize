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
    this.running = false;
    this.playing = false;
    setInterval(() => {
      if (this.running) {
        this.update();
        this.ctx.clearRect(0, 0, this.size, this.size);
        this.draw();
        this.time++;
      }
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
    if (!this.playing) {
      const audio = new Audio(`${file}.mp3`);
      this.playing = true;
      audio.play().then(() => (this.playing = false));
    }
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
    <canvas width="${size}"  height="${size}" id="canvas" style="border:white solid 2px"></canvas>
    <div id="overlay">Play</div>
  `;
  window.document.querySelector("#overlay").style.background = "black";
  window.document.querySelector("#overlay").style.opacity = "50%";
  window.document.querySelector("#overlay").style.width = "100%";
  window.document.querySelector("#overlay").style.height = "100%";
  window.document.querySelector("#overlay").style.position = "absolute";
  window.document.querySelector("#overlay").style.display = "flex";
  window.document.querySelector("#overlay").style.color = "gray";
  window.document.querySelector("#overlay").style.justifyContent = "center";
  window.document.querySelector("#overlay").style.alignItems = "center";
  window.document.querySelector("#overlay").style.fontFamily = "courier";
  window.document.querySelector("#overlay").style.fontSize = "3rem";
  window.document.querySelector("#overlay").style.cursor = "pointer";
  window.document.querySelector("#overlay").addEventListener("click", (e) => {
    game.running = true;
    e.target.style.display = "none";
  });
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
