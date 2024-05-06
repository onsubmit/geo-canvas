import { CanvasModel } from '../CanvasModel';
import { ColorAtTimeFn } from '../Colors';
import { Drawable } from './Drawable';
import { Point } from './Point';

export type LineSegmentArgs = {
  point1: Point;
  point2: Point;
  color?: ColorAtTimeFn;
};

export class LineSegment extends Drawable {
  private _point1: Point;
  private _point2: Point;

  constructor({ point1, point2, color }: LineSegmentArgs) {
    super(color);
    this._point1 = point1;
    this._point2 = point2;
  }

  draw = (time: number, canvasModel: CanvasModel): void => {
    const c1 = this._point1.getCoordsAtTime(time);
    const c2 = this._point2.getCoordsAtTime(time);
    if (!c1 || !c2) {
      return;
    }

    const p1 = this.mapCoordsToCanvas(c1, canvasModel);
    const p2 = this.mapCoordsToCanvas(c2, canvasModel);
    canvasModel.context.beginPath();
    canvasModel.context.strokeStyle = this.getColor(time);
    canvasModel.context.moveTo(p1.x, p1.y);
    canvasModel.context.lineTo(p2.x, p2.y);
    canvasModel.context.stroke();
  };
}
