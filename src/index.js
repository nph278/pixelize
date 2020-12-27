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
    this.ctx.font = `${size / 20}px courier`;
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
  text(text, x, y, color) {
    color = color || "white";
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, (x * this.size) / 100, (y * this.size) / 100);
  }
}

const setUpGame = (window) => {
  let mobile = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      mobile = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  let size =
    Math.floor(Math.min(window.innerHeight, window.innerWidth) / 100) * 100;
  window.document.body.style.margin = 0;
  window.document.body.style.overflow = "hidden";
  window.document.body.style.background = "black";
  window.document.body.style.height = "100vh";
  const btnStyle =
    "color:white; background-color: gray; font-family: arial; font-size: 3rem; display: block; margin: 5px; cursor: pointer; flex-grow: 1; user-select: none; text-align: center";
  const nullStyle =
    "padding:5px;font-size: 3rem;font-family:arial; margin:5px;flex-grow:1;user-select:none; text-align: center";
  window.document.body.innerHTML = `
    <div style="display:flex; width:100%; height:100%; flex-direction:column">
      <div style="display:flex; justify-content:center;width: 100%; height:100%">
        <canvas width="${size}"  height="${size}" id="canvas" style="box-sizing: border-box;border:white solid  2px; display:block; height:100%"></canvas>
      </div>

    ${
      mobile &&
      `
      <div style="height: 200px;width: 100%; display:flex; flex-direction: column">
        <div style="display:flex">
          <div style="${nullStyle}">&nbsp;</div>
          <div id="btn-ArrowUp" style="${btnStyle}">^</div>
          <div style="${nullStyle}">&nbsp;</div>
          <div style="${nullStyle}">&nbsp;</div>
          <div id="btn-z" style="${btnStyle}">Z</div>
        </div>
        <div style="display:flex">
          <div id="btn-ArrowLeft" style="${btnStyle}">&lt;</div>
          <div id="btn-ArrowDown" style="${btnStyle}">v</div>
          <div id="btn-ArrowRight" style="${btnStyle}">&gt;</div>
          <div id="btn-x" style="${btnStyle}">X</div>
          <div style="${nullStyle}">&nbsp;</div>
        </div>
      </div>
    `
    }
    </div>
  `;
  window.document.querySelector("canvas").style.cursor = "pointer";
  window.document.querySelector("canvas").addEventListener("click", (e) => {
    game.running = true;
    window.document.querySelector("canvas").style.cursor = "auto";
  });
  const keyArr = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "z", "x"];
  mobile &&
    keyArr.forEach((key) => {
      window.document
        .querySelector("#btn-" + key)
        .addEventListener("touchstart", () => {
          game.keys[key] = true;
        });
      window.document
        .querySelector("#btn-" + key)
        .addEventListener("touchend", () => {
          game.keys[key] = false;
        });
    });

  const ctx = window.document.getElementById("canvas").getContext("2d");
  const game = new Game(ctx, size);
  game.text("Start", 43, 50);
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
    game.ctx.font = `${size / 20}px courier`;
    game.size = size;
    game.text("Start", 43, 50);
  });
  return game;
};
