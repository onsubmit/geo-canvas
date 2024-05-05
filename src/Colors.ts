export type ColorAtTimeFn = (time: DOMHighResTimeStamp) => string;

export class Colors {
  static black: ColorAtTimeFn = (_time: DOMHighResTimeStamp) => '#000';
  static lightGrey: ColorAtTimeFn = (_time: DOMHighResTimeStamp) => '#ccc';
}
