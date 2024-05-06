import { Coordinate } from '../Coordinate';
import { Circle } from './Circle';
import { Point } from './Point';

export class PointFactory {
  static aroundCircle = (args: { circle: Circle; speed: number }): Point => {
    const { circle, speed } = args;

    return Point.withGetCoordsAtTime((time) => {
      const rotation = time * speed;
      const origin = circle.origin.getCoordsAtTime(time);

      if (!origin) {
        return null;
      }

      return {
        x: origin.x + circle.radius * Math.cos(rotation),
        y: origin.y + circle.radius * Math.sin(rotation),
      };
    });
  };

  static constant = (coordinate: Coordinate): Point => Point.withConstantCoords(coordinate);

  static circleIntersections = (circle1: Circle, circle2: Circle): [Point, Point] => {
    // https://gist.github.com/jupdike/bfe5eb23d1c395d8a0a1a4ddd94882ac
    function intersectTwoCircles(
      x1: number,
      y1: number,
      r1: number,
      x2: number,
      y2: number,
      r2: number
    ): Array<Coordinate> {
      const centerdx = x1 - x2;
      const centerdy = y1 - y2;
      const R = Math.sqrt(centerdx * centerdx + centerdy * centerdy);
      if (!(Math.abs(r1 - r2) <= R && R <= r1 + r2)) {
        // no intersection
        return [];
      }

      const R2 = R * R;
      const R4 = R2 * R2;
      const a = (r1 * r1 - r2 * r2) / (2 * R2);
      const r2r2 = r1 * r1 - r2 * r2;
      const c = Math.sqrt((2 * (r1 * r1 + r2 * r2)) / R2 - (r2r2 * r2r2) / R4 - 1);

      const fx = (x1 + x2) / 2 + a * (x2 - x1);
      const gx = (c * (y2 - y1)) / 2;
      const ix1 = fx + gx;
      const ix2 = fx - gx;

      const fy = (y1 + y2) / 2 + a * (y2 - y1);
      const gy = (c * (x1 - x2)) / 2;
      const iy1 = fy + gy;
      const iy2 = fy - gy;

      // note if gy == 0 and gx == 0 then the circles are tangent and there is only one solution
      // but that one solution will just be duplicated as the code is currently written
      return [
        { x: ix1, y: iy1 },
        { x: ix2, y: iy2 },
      ];
    }

    // http://math.stackexchange.com/a/1367732
    function getIntersectionsAtTime(index: 0 | 1): (time: DOMHighResTimeStamp) => Coordinate | null {
      return function (time: DOMHighResTimeStamp) {
        const origin1 = circle1.origin.getCoordsAtTime(time);
        const origin2 = circle2.origin.getCoordsAtTime(time);

        if (!origin1 || !origin2) {
          return null;
        }

        const intersections = intersectTwoCircles(
          origin1.x,
          origin1.y,
          circle1.radius,
          origin2.x,
          origin2.y,
          circle2.radius
        );

        return intersections[index] ?? null;
      };
    }

    // TODO: Memoize the result or make a better solution as to not calculate the intersections twice.
    return [Point.withGetCoordsAtTime(getIntersectionsAtTime(0)), Point.withGetCoordsAtTime(getIntersectionsAtTime(1))];
  };
}
