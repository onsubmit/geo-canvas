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

    const range = 10;
    const cartesianPlane: CartesianPlane = {
      x: {
        min: -range,
        max: range,
      },
      y: {
        min: -range,
        max: range,
      },
    };

    setCanvasModel(new CanvasModel(context, CANVAS_SCALE, cartesianPlane));
  }, [canvasModel]);

  function draw(canvasModel: CanvasModel) {
    if (!canvasModel) {
      return;
    }

    const leftCircle = new Circle(PointFactory.constant({ x: 0, y: 0 }), 1, Colors.lightGrey);
    const rightCircle = new Circle(PointFactory.constant({ x: 3, y: 1 }), 1, Colors.lightGrey);
    const leftCirclePoint = PointFactory.aroundCircle(leftCircle, 0.004);
    const rightCirclePoint = PointFactory.aroundCircle(rightCircle, 0.003);

    const circleAroundLeftCirclePoint = new Circle(leftCirclePoint, 3, Colors.lightGrey);
    const circleAroundRightCirclePoint = new Circle(rightCirclePoint, 3, Colors.lightGrey);

    setDrawables([
      leftCircle,
      leftCirclePoint,
      rightCircle,
      rightCirclePoint,
      circleAroundLeftCirclePoint,
      circleAroundRightCirclePoint,
    ]);
  }

  return <Scene ref={canvasRef} {...{ canvasModel, drawables }}></Scene>;
}

export default MainScene;
