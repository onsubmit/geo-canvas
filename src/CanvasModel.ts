import { CartesianPlane } from './components/CartesianPlane';
import { Dimensions } from './Dimensions';

export class CanvasModel {
  context: CanvasRenderingContext2D;
  dimensions: Dimensions;
  cartesianPlane: CartesianPlane;

  constructor(context: CanvasRenderingContext2D, canvasScale: number, cartesianPlane: CartesianPlane) {
    const canvasDimensions = {
      width: canvasScale * (cartesianPlane.x.max - cartesianPlane.x.min),
      height: canvasScale * (cartesianPlane.y.max - cartesianPlane.y.min),
    };

    this.context = context;
    this.dimensions = canvasDimensions;
    this.cartesianPlane = cartesianPlane;
  }
}
