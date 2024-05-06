import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { Colors } from '../../Colors';
import { Circle } from '../../Drawables/Circle';
import { Drawable } from '../../Drawables/Drawable';
import { PointFactory } from '../../Drawables/PointFactory';
import { CartesianPlane } from '../CartesianPlane';
import Scene from './Scene';

function MainScene() {
  const CANVAS_SCALE = 50;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasModel, setCanvasModel] = useState<CanvasModel | null>(null);
  const [drawables, setDrawables] = useState<Array<Drawable>>([]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (canvasModel) {
      draw(canvasModel);
      return;
    }

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas drawing context');
    }

    const cartesianPlane: CartesianPlane = {
      x: {
        min: -6,
        max: 10,
      },
      y: {
        min: -7,
        max: 8,
      },
    };

    setCanvasModel(new CanvasModel(context, CANVAS_SCALE, cartesianPlane));
  }, [canvasModel]);

  function draw(canvasModel: CanvasModel) {
    if (!canvasModel) {
      return;
    }

    const leftCircle = new Circle({
      origin: PointFactory.constant({ x: 0, y: 0 }),
      radius: 1,
      color: Colors.lightGrey,
    });

    const rightCircle = new Circle({
      origin: PointFactory.constant({ x: 3, y: 1 }),
      radius: 1,
      color: Colors.lightGrey,
    });

    const leftCirclePoint = PointFactory.aroundCircle({
      circle: leftCircle,
      speed: 0.004,
    });

    const rightCirclePoint = PointFactory.aroundCircle({
      circle: rightCircle,
      speed: 0.003,
    });

    const circleAroundLeftCirclePoint = new Circle({
      origin: leftCirclePoint,
      radius: 3,
      color: Colors.lightGrey,
    });

    const circleAroundRightCirclePoint = new Circle({
      origin: rightCirclePoint,
      radius: 3,
      color: Colors.lightGrey,
    });

    const circleIntersections1 = PointFactory.circleIntersections(
      circleAroundLeftCirclePoint,
      circleAroundRightCirclePoint
    );

    setDrawables([
      leftCircle,
      leftCirclePoint,
      rightCircle,
      rightCirclePoint,
      circleAroundLeftCirclePoint,
      circleAroundRightCirclePoint,
      circleIntersections1[0],
      circleIntersections1[1],
    ]);
  }

  return <Scene ref={canvasRef} {...{ canvasModel, drawables }}></Scene>;
}

export default MainScene;
