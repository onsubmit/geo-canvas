import { CanvasModel } from '../CanvasModel';
import { ColorAtTimeFn } from '../Colors';
import { Constants } from '../Constants';
import { Coordinate } from '../Coordinate';
import { Drawable } from './Drawable';

export class Circle extends Drawable {
  private _origin: Coordinate;
  private _radius: number;

  constructor(origin: Coordinate, radius: number, getColorAtTimeFn?: ColorAtTimeFn) {
    super(getColorAtTimeFn);
    this._origin = origin;
    this._radius = radius;
  }

  get origin(): Coordinate {
    return this._origin;
  }

  get radius(): number {
    return this._radius;
  }

  draw = (time: number, canvasModel: CanvasModel): void => {
    const p = this.mapCoordsToCanvas(this._origin, canvasModel);
    canvasModel.context.beginPath();
    canvasModel.context.strokeStyle = this.getColor(time);
    canvasModel.context.arc(p.x, p.y, this.scaleLengthToCanvas(this._radius, canvasModel), 0, Constants.TWO_PI);
    canvasModel.context.stroke();
  };
}
