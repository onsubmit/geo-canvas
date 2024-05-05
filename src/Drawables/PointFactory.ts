import { Coordinate } from '../Coordinate';
import { Point } from './Point';

export class PointFactory {
  static aroundCircle = (origin: Coordinate, radius: number, speed: number): Point => {
    return Point.withGetCoordsAtTime((t) => {
      const rotation = t * speed;
      return {
        x: origin.x + radius * Math.cos(rotation),
        y: origin.y + radius * Math.sin(rotation),
      };
    });
  };
}
