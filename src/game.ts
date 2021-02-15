import { SpriteAnimation } from "./animation";
import { keymap } from "./keymap";

export class Game {
  ctx: CanvasRenderingContext2D | null;
  paused: boolean;
  size: number;
  update: () => void;
  draw: () => void;
  time: number;
  keys: {
    [key: string]: boolean;
  };
  running: boolean;
  config: {
    [key: string]: any;
  };

  constructor(config: { [key: string]: any }) {
    this.ctx = null;
    this.paused = false;
    this.size = 0;
    this.update = () => {};
    this.draw = () => {};
    this.time = 0;
    this.keys = {};
    this.running = false;
    this.config = config || {};
    defaultTo(this.config, "excludeButtons", []); // Buttons to exclude on mobile version
    defaultTo(this.config, "pauseKey", "Escape"); // Key to pause game
    defaultTo(this.config, "fps", 30); // Attempted FPS
  }
  key(key: string) {
    return !!this.keys[key in keymap ? keymap[key] : key];
  }
  sprite(sprite: SpriteAnimation, x: number, y: number) {
    let ready = 0;
    const arr = sprite.frame(this.time).split(".");
    let parsed = [];
    arr.forEach((_, i) => {
      !ready && parsed.push(arr.slice(i, i + 8));
      ready++;
      ready %= 8;
    });
    if (sprite) {
      parsed.forEach((row, x1) =>
        row.forEach((color: string, y1: number) => {
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
  }
  text(text: string, x: number, y: number, color?: string) {
    color = color || "white";
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, (x * this.size) / 100, (y * this.size) / 100);
  }

  mount(element: HTMLElement) {
    /* This checks for mobile browsers */

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
    })(navigator.userAgent || navigator.vendor);
    let size =
      Math.floor(Math.min(window.innerHeight, window.innerWidth) / 100) * 100;
    element.style.margin = "0";
    element.style.overflow = "hidden";
    element.style.background = "black";
    element.style.userSelect = "none";
    element.style.height = "100vh";
    const nullStyle =
      "padding:5px;font-size: 3rem;font-family:arial; margin:5px;flex-grow:1;user-select:none; text-align: center";
    const nullDiv = `<div style="${nullStyle}">&nbsp;</div>`;
    const btnStyle =
      "color:white; background-color: gray; font-family: arial; font-size: 3rem; display: block; margin: 5px; cursor: pointer; flex-grow: 1; user-select: none; text-align: center";
    element.innerHTML = `
    <div style="display:flex; width:100%; height:100%; flex-direction:column">
      <div style="display:flex; justify-content:center;width: 100%; height:100%">
        <canvas width="${size}"  height="${size}" id="canvas" style="box-sizing: border-box;border:white solid  2px; display:block; height:100%"></canvas>
      </div>

    ${
      mobile &&
      `
      <div style="height: 200px;width: 100%; display:flex; flex-direction: column">
        <div style="display:flex">
          ${nullDiv}
          ${
            !this.config.excludeButtons.includes("up")
              ? `<div id="btn-ArrowUp" style="${btnStyle}">^</div>`
              : nullDiv
          }
          ${nullDiv}
          ${nullDiv}
          ${
            !this.config.excludeButtons.includes("z")
              ? `<div id="btn-z" style="${btnStyle}">Z</div>`
              : nullDiv
          }
        </div>
        <div style="display:flex">
          ${
            !this.config.excludeButtons.includes("left")
              ? `<div id="btn-ArrowLeft" style="${btnStyle}">&lt;</div>`
              : nullDiv
          }
          ${
            !this.config.excludeButtons.includes("down")
              ? `<div id="btn-ArrowDown" style="${btnStyle}">v</div>`
              : nullDiv
          }
          ${
            !this.config.excludeButtons.includes("right")
              ? `<div id="btn-ArrowRight" style="${btnStyle}">&gt;</div>`
              : nullDiv
          }
          ${
            !this.config.excludeButtons.includes("x")
              ? `<div id="btn-x" style="${btnStyle}">X</div>`
              : nullDiv
          }
          ${nullDiv}
        </div>
      </div>
      <div style="height: 200px;width: 100%;">
      </div>
    `
    }
    </div>
  `;
    element.querySelector("canvas").style.cursor = "pointer";
    element.querySelector("canvas").addEventListener("click", () => {
      this.running = true;
      element.querySelector("canvas").style.cursor = "auto";
    });
    const keyArr = [
      "ArrowUp",
      "ArrowDown",
      "ArrowRight",
      "ArrowLeft",
      "z",
      "x",
    ];
    const shortKey = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowRight: "right",
      ArrowLeft: "left",
      x: "x",
      y: "y",
    };
    mobile &&
      keyArr.forEach((key) => {
        if (!this.config.excludeButtons.includes(shortKey[key])) {
          element
            .querySelector("#btn-" + key)
            .addEventListener("touchstart", (e: TouchEvent) => {
              e.preventDefault();
              this.keys[key] = true;
            });
          element
            .querySelector("#btn-" + key)
            .addEventListener("touchend", (e: TouchEvent) => {
              e.preventDefault();
              this.keys[key] = false;
            });
          element
            .querySelector("#btn-" + key)
            .addEventListener("touchcancel", (e: TouchEvent) => {
              e.preventDefault();
              this.keys[key] = false;
            });
        }
      });
    const canvas = element.querySelector("canvas");
    this.ctx = canvas.getContext("2d");
    this.text("Start", 43, 50);
    window.addEventListener("keydown", ({ key }) => {
      this.keys[key] = true;
      if (key === this.config.pauseKey) {
        this.paused = !this.paused;
      }
    });
    window.addEventListener("keyup", ({ key }) => {
      this.keys[key] = false;
    });
    window.addEventListener("resize", () => {
      size =
        Math.floor(Math.min(window.innerHeight, window.innerWidth) / 100) * 100;
      element.querySelector("canvas").width = size;
      element.querySelector("canvas").height = size;
      this.ctx.font = `${size / 20}px courier`;
      this.size = size;
      this.text("Start", 43, 50);
    });
    this.size = size;
    this.ctx.font = `${this.size / 20}px courier`;
    setInterval(() => {
      this.ctx.clearRect(0, 0, this.size, this.size);
      if (this.running) {
        if (!this.paused) {
          this.update();
          this.draw();
          this.time++;
        } else {
          this.text("paused", 40, 50);
        }
      }
    }, Math.floor(1000 / this.config.fps));
  }
}

const defaultTo = (obj: object, property: string, defaultValue: any) => {
  obj[property] = obj[property] === undefined ? defaultValue : obj[property];
};
