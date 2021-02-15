export class SpriteAnimation {
  private frames: string[];
  private interval: number;

  constructor(frames: string[], interval: number) {
    this.frames = frames;
    this.interval = interval;
  }

  frame(time: number) {
    return this.frames[Math.floor(time / this.interval) % this.frames.length];
  }
}

export const animation = (frames: string[] | string, interval?: number) => {
  return new SpriteAnimation(
    typeof frames === "string" ? [frames] : frames,
    interval ?? 1
  );
};
