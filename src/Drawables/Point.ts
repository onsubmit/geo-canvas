import { CanvasModel } from '../CanvasModel';
import { Constants } from '../Constants';
import { Coordinate } from '../Coordinate';
import { Drawable } from './Drawable';

export class Point extends Drawable {
  private static RADIUS = 2;

  static withGetCoordsAtTime = (getCoordsAtTime: (timeStamp: number) => Coordinate): Point => {
    const point = new Point();
    point.getCoordsAtTime = getCoordsAtTime;
    return point;
  };

  static withConstantCoords = (coordinate: Coordinate): Point => {
    const point = new Point();
    point.getCoordsAtTime = () => coordinate;
    return point;
  };

  getCoordsAtTime: (timeStamp: number) => Coordinate = (_) => {
    throw new Error('Not implemented');
  };

  draw = (time: DOMHighResTimeStamp, canvasModel: CanvasModel) => {
    const c = this.getCoordsAtTime(time);
    const p = this.mapCoordsToCanvas(c, canvasModel);
    canvasModel.context.beginPath();
    canvasModel.context.fillStyle = this.getColor(time);
    canvasModel.context.arc(p.x, p.y, Point.RADIUS, 0, Constants.TWO_PI);
    canvasModel.context.closePath();
    canvasModel.context.fill();
  };
}
