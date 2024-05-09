import { CanvasModel } from '../CanvasModel';
import { ColorAtTimeFn, Colors } from '../Colors';
import { Coordinate } from '../Coordinate';

export abstract class Drawable {
  protected getColorAtTime: ColorAtTimeFn;

  constructor(getColorAtTimeFn?: ColorAtTimeFn) {
    this.getColorAtTime = getColorAtTimeFn ?? Colors.black;
  }

  abstract draw(time: DOMHighResTimeStamp, canvasModel: CanvasModel): void;

  protected mapCoordsToCanvas = (c: Coordinate, canvasModel: CanvasModel): Coordinate => {
    return {
      x: Math.round(
        ((c.x - canvasModel.cartesianPlane.x.min) / canvasModel.cartesianDimensions.width) *
          canvasModel.canvasDimensions.width
      ),
      y: Math.round(
        canvasModel.canvasDimensions.height -
          ((c.y - canvasModel.cartesianPlane.y.min) / canvasModel.cartesianDimensions.height) *
            canvasModel.canvasDimensions.height
      ),
    };
  };

  protected scaleLengthToCanvas = (length: number, canvasModel: CanvasModel): number =>
    length * canvasModel.canvasScale;
}
