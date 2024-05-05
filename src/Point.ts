import { CanvasModel } from './CanvasModel';
import { Constants } from './Constants';
import { Coordinate } from './Coordinate';
import { Drawable } from './Drawable';

export class Point extends Drawable {
  private static RADIUS = 2;

  private _getCurrentCoords: (timeStamp: number) => Coordinate = (_) => {
    throw new Error('Not implemented');
  };

  private constructor(canvasModel: CanvasModel) {
    super(canvasModel);
  }

  static withGetCurrentCoords = (
    getCurrentCoords: (timeStamp: number) => Coordinate,
    canvasModel: CanvasModel
  ): Point => {
    const point = new Point(canvasModel);
    point._getCurrentCoords = getCurrentCoords;
    return point;
  };

  static withConstantCoords = (x: number, y: number, canvasModel: CanvasModel): Point => {
    const point = new Point(canvasModel);
    point._getCurrentCoords = () => ({ x, y });
    return point;
  };

  draw = (time: DOMHighResTimeStamp) => {
    const c = this._getCurrentCoords(time);
    this._draw(c);
  };

  private _draw = (c: Coordinate, color?: string): void => {
    const p = this.mapCoordsToCanvas(c);
    this.context.beginPath();
    this.context.fillStyle = color || '#000';
    this.context.arc(p.x, p.y, Point.RADIUS, 0, Constants.TWO_PI);
    this.context.closePath();
    this.context.fill();
  };
}
