import { Circle } from './Circle';
import { Point } from './Point';

export class PointFactory {
  static aroundCircle = (circle: Circle, speed: number): Point => {
    return Point.withGetCoordsAtTime((t) => {
      const rotation = t * speed;
      return {
        x: circle.origin.x + circle.radius * Math.cos(rotation),
        y: circle.origin.y + circle.radius * Math.sin(rotation),
      };
    });
  };
}
