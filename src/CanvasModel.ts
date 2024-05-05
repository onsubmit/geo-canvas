import { CartesianPlane } from './components/CartesianPlane';
import { Dimensions } from './Dimensions';

export class CanvasModel {
  context: CanvasRenderingContext2D;
  canvasScale: number;
  cartesianDimensions: Dimensions;
  canvasDimensions: Dimensions;
  cartesianPlane: CartesianPlane;

  constructor(context: CanvasRenderingContext2D, canvasScale: number, cartesianPlane: CartesianPlane) {
    const cartesianDimensions = {
      width: cartesianPlane.x.max - cartesianPlane.x.min,
      height: cartesianPlane.y.max - cartesianPlane.y.min,
    };

    const canvasDimensions = {
      width: canvasScale * cartesianDimensions.width,
      height: canvasScale * cartesianDimensions.height,
    };

    this.context = context;
    this.canvasScale = canvasScale;
    this.cartesianDimensions = cartesianDimensions;
    this.canvasDimensions = canvasDimensions;
    this.cartesianPlane = cartesianPlane;
  }
}
