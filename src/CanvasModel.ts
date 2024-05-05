import { CartesianPlane } from './components/CartesianPlane';
import { Dimensions } from './Dimensions';

export class CanvasModel {
  context: CanvasRenderingContext2D;
  dimensions: Dimensions;
  cartesianPlane: CartesianPlane;

  constructor(context: CanvasRenderingContext2D, dimensions: Dimensions, cartesianPlane: CartesianPlane) {
    this.context = context;
    this.dimensions = dimensions;
    this.cartesianPlane = cartesianPlane;
  }
}
