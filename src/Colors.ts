export type ColorAtTimeFn = (time: DOMHighResTimeStamp) => string;

export class Colors {
  static black: ColorAtTimeFn = (_time: DOMHighResTimeStamp) => '#000';
  static lightGrey: ColorAtTimeFn = (_time: DOMHighResTimeStamp) => '#999';
  static veryLightGrey: ColorAtTimeFn = (_time: DOMHighResTimeStamp) => '#eee';
  static colorful: ColorAtTimeFn = (time: DOMHighResTimeStamp) => {
    const r = 128 * (0.5 + Math.cos(time / 1000) / 2);
    const g = 200 * (0.5 + Math.sin(time / 1000) / 2);
    const b = 255;
    const a = 1;

    const color = 'rgba(' + [r, g, b, a].join(',') + ')';
    return color;
  };
}
