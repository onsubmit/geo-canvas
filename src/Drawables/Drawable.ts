import { CanvasModel } from '../CanvasModel';
import { Coordinate } from '../Coordinate';

export abstract class Drawable {
  abstract draw(time: DOMHighResTimeStamp, canvasModel: CanvasModel, color: string): void;

  getColor = (_time: number): string => '#000';

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
}
