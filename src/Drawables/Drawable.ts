import { CanvasModel } from '../CanvasModel';
import { Coordinate } from '../Coordinate';

export abstract class Drawable {
  private _cartesianWidth: number;
  private _cartesianHeight: number;

  private _canvasModel: CanvasModel;

  constructor(canvasModel: CanvasModel) {
    this._canvasModel = canvasModel;

    this._cartesianWidth = canvasModel.cartesianPlane.x.max - canvasModel.cartesianPlane.x.min;
    this._cartesianHeight = canvasModel.cartesianPlane.y.max - canvasModel.cartesianPlane.y.min;
  }

  get context(): CanvasRenderingContext2D {
    return this._canvasModel.context;
  }

  abstract draw(time: DOMHighResTimeStamp): void;

  protected mapCoordsToCanvas = (c: Coordinate): Coordinate => {
    return {
      x: Math.round(
        ((c.x - this._canvasModel.cartesianPlane.x.min) / this._cartesianWidth) * this._canvasModel.dimensions.width
      ),
      y: Math.round(
        this._canvasModel.dimensions.height -
          ((c.y - this._canvasModel.cartesianPlane.y.min) / this._cartesianHeight) * this._canvasModel.dimensions.height
      ),
    };
  };
}
