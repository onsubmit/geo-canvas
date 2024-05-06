import { CanvasModel } from '../CanvasModel';
import { Constants } from '../Constants';
import { Coordinate } from '../Coordinate';
import { Drawable } from './Drawable';

export class Point extends Drawable {
  private static RADIUS = 1;

  private _traceCoordinates: Array<Coordinate> = [];
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

  resetTrace = () => {
    this._traceCoordinates = [];
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
      this._traceCoordinates.push(p);
    }

    (this._trace ? this._traceCoordinates : [p]).forEach((p) => {
      canvasModel.context.beginPath();
      canvasModel.context.fillStyle = this.getColor(time);
      canvasModel.context.arc(p.x, p.y, Point.RADIUS, 0, Constants.TWO_PI);
      canvasModel.context.closePath();
      canvasModel.context.fill();
    });
  };
}
