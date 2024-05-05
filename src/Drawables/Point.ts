import { CanvasModel } from '../CanvasModel';
import { Constants } from '../Constants';
import { Coordinate } from '../Coordinate';
import { Drawable } from './Drawable';

export class Point extends Drawable {
  private static RADIUS = 2;

  private _getCoordsAtTime: (timeStamp: number) => Coordinate = (_) => {
    throw new Error('Not implemented');
  };

  static withGetCoordsAtTime = (getCoordsAtTime: (timeStamp: number) => Coordinate): Point => {
    const point = new Point();
    point._getCoordsAtTime = getCoordsAtTime;
    return point;
  };

  static withConstantCoords = (x: number, y: number): Point => {
    const point = new Point();
    point._getCoordsAtTime = () => ({ x, y });
    return point;
  };

  draw = (time: DOMHighResTimeStamp, canvasModel: CanvasModel, color: string) => {
    const c = this._getCoordsAtTime(time);
    const p = this.mapCoordsToCanvas(c, canvasModel);
    canvasModel.context.beginPath();
    canvasModel.context.fillStyle = color || '#000';
    canvasModel.context.arc(p.x, p.y, Point.RADIUS, 0, Constants.TWO_PI);
    canvasModel.context.closePath();
    canvasModel.context.fill();
  };
}
