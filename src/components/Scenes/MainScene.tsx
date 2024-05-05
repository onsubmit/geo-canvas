import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { Colors } from '../../Colors';
import { Circle } from '../../Drawables/Circle';
import { Drawable } from '../../Drawables/Drawable';
import { PointFactory } from '../../Drawables/PointFactory';
import { CartesianPlane } from '../CartesianPlane';
import Scene from './Scene';

function MainScene() {
  const CANVAS_SCALE = 100;

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
        min: -2,
        max: 5,
      },
      y: {
        min: -2,
        max: 4,
      },
    };

    setCanvasModel(new CanvasModel(context, CANVAS_SCALE, cartesianPlane));
  }, [canvasModel]);

  function draw(canvasModel: CanvasModel) {
    if (!canvasModel) {
      return;
    }

    const leftCircle = new Circle({ x: 0, y: 0 }, 1, Colors.lightGrey);
    const rightCircle = new Circle({ x: 3, y: 1 }, 1, Colors.lightGrey);
    const leftCirclePoint = PointFactory.aroundCircle(leftCircle, 0.004);
    const rightCirclePoint = PointFactory.aroundCircle(rightCircle, 0.003);

    setDrawables([leftCircle, leftCirclePoint, rightCircle, rightCirclePoint]);
  }

  return <Scene ref={canvasRef} {...{ canvasModel, drawables }}></Scene>;
}

export default MainScene;
