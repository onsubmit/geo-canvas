import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { Drawable } from '../../Drawables/Drawable';
import { Point } from '../../Drawables/Point';
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

    const leftCirclePoint = Point.withGetCoordsAtTime((t) => {
      const rotation = t * 0.004;
      return {
        x: Math.cos(rotation),
        y: Math.sin(rotation),
      };
    }, canvasModel);

    const rightCirclePoint = Point.withGetCoordsAtTime((t) => {
      const rotation = t * 0.003;
      return {
        x: 3 - Math.cos(rotation),
        y: 1 - Math.sin(rotation),
      };
    }, canvasModel);

    setDrawables([leftCirclePoint, rightCirclePoint]);
  }

  return <Scene ref={canvasRef} {...{ canvasModel, drawables }}></Scene>;
}

export default MainScene;
