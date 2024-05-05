import { CanvasModel } from '../CanvasModel';
import { ColorAtTimeFn } from '../Colors';
import { Constants } from '../Constants';
import { Drawable } from './Drawable';
import { Point } from './Point';

export type CircleArgs = {
  origin: Point;
  radius: number;
  color?: ColorAtTimeFn;
};

export class Circle extends Drawable {
  private _origin: Point;
  private _radius: number;

  constructor({ origin, radius, color }: CircleArgs) {
    super(color);
    this._origin = origin;
    this._radius = radius;
  }

  get origin(): Point {
    return this._origin;
  }

  get radius(): number {
    return this._radius;
  }

  draw = (time: number, canvasModel: CanvasModel): void => {
    const p = this.mapCoordsToCanvas(this._origin.getCoordsAtTime(time), canvasModel);
    canvasModel.context.beginPath();
    canvasModel.context.strokeStyle = this.getColor(time);
    canvasModel.context.arc(p.x, p.y, this.scaleLengthToCanvas(this._radius, canvasModel), 0, Constants.TWO_PI);
    canvasModel.context.stroke();
  };
}
