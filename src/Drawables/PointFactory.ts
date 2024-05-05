import { Coordinate } from '../Coordinate';
import { Circle } from './Circle';
import { Point } from './Point';

export class PointFactory {
  static aroundCircle = (circle: Circle, speed: number): Point => {
    return Point.withGetCoordsAtTime((time) => {
      const rotation = time * speed;
      return {
        x: circle.origin.getCoordsAtTime(time).x + circle.radius * Math.cos(rotation),
        y: circle.origin.getCoordsAtTime(time).y + circle.radius * Math.sin(rotation),
      };
    });
  };

  static constant = (coordinate: Coordinate): Point => Point.withConstantCoords(coordinate);
}
