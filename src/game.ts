import { SpriteAnimation } from "./animation";
import { isMobile } from "./ismobile";
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
    defaultTo(this.config, "fps", 60); // Attempted FPS
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
    const mobile = isMobile();
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
