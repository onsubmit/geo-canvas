import { CanvasModel } from '../CanvasModel';
import { Constants } from '../Constants';
import { Coordinate } from '../Coordinate';
import { Drawable } from './Drawable';

export class Point extends Drawable {
  private static RADIUS = 4;

  private _previousPoint: Coordinate | undefined;
  private _trace = false;

  static withGetCoordsAtTime = (getCoordsAtTime: (time: DOMHighResTimeStamp) => Coordinate | null): Point => {
    const point = new Point();
    point.getCoordsAtTime = getCoordsAtTime;
    return point;
  };

  static withConstantCoords = (coordinate: Coordinate): Point => {
    const point = new Point();
    point.getCoordsAtTime = () => coordinate;
    return point;
  };

  toggleTracing = () => {
    this._trace = !this._trace;
  };

  getCoordsAtTime: (timeStamp: number) => Coordinate | null = (_) => {
    throw new Error('Not implemented');
  };

  draw = (time: DOMHighResTimeStamp, canvasModel: CanvasModel) => {
    const c = this.getCoordsAtTime(time);
    if (!c) {
      return;
    }

    const p = this.mapCoordsToCanvas(c, canvasModel);

    if (this._trace) {
      if (this._previousPoint) {
        canvasModel.context.beginPath();
        canvasModel.context.strokeStyle = this.getColor(time);
        canvasModel.context.moveTo(this._previousPoint.x, this._previousPoint.y);
        canvasModel.context.lineTo(p.x, p.y);
        canvasModel.context.closePath();
        canvasModel.context.stroke();
      }

      this._previousPoint = p;
      return;
    }

    canvasModel.context.beginPath();
    canvasModel.context.fillStyle = this.getColor(time);
    canvasModel.context.arc(p.x, p.y, Point.RADIUS, 0, Constants.TWO_PI);
    canvasModel.context.closePath();
    canvasModel.context.fill();
  };
}
