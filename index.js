class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.sprites = {};
    this.update = () => {};
    this.draw = () => {};
    this.time = 0;
    setInterval(() => {
      this.update();
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.draw();
      this.time++;
    }, 33);
  }
  addSprite(name, sprite) {
    this.sprites[name] = JSON.parse(atob(sprite));
  }
  sprite(name, x, y) {
    const sprite = this.sprites[name];
    sprite.forEach((row, x1) =>
      row.forEach((color, y1) => {
        if (color !== "") {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(
            Math.floor(x + x1) * 10,
            Math.floor(y + y1) * 10,
            10,
            10
          );
        }
      })
    );
  }
}

const setUpGame = (document) => {
  document.body.style.margin = 0;
  document.body.style.overflow = "hidden";
  document.body.innerHTML = `<canvas width="${
    document.querySelector("html").clientWidth
  }"  height="${
    document.querySelector("html").clientHeight + 10
  }" id="canvas" />`;
  const ctx = document.getElementById("canvas").getContext("2d");
  const width = document.querySelector("canvas").clientWidth;
  const height = document.querySelector("canvas").clientHeight;
  return new Game(ctx, width, height);
};
