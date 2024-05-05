import { CanvasModel } from './CanvasModel';
import { Drawable } from './Drawables/Drawable';

export default class Drawer {
  private _canvasModel: CanvasModel;

  constructor(canvasModel: CanvasModel) {
    this._canvasModel = canvasModel;
  }

  clear = (): void => {
    this._canvasModel.context.clearRect(
      0,
      0,
      this._canvasModel.canvasDimensions.width,
      this._canvasModel.canvasDimensions.height
    );
  };

  draw = (drawable: Drawable, time: DOMHighResTimeStamp): void => {
    drawable.draw(time, this._canvasModel);
  };
}
