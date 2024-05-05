import { useEffect, useRef, useState } from 'react';

import styles from './App.module.css';
import { CanvasModel } from './CanvasModel';
import { Canvas } from './components/Canvas';
import { Drawable } from './Drawable';
import { Point } from './Point';

type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasModel, setCanvasModel] = useState<CanvasModel | null>(null);

  const cartesianPlane = {
    x: {
      min: -2,
      max: 5,
    },
    y: {
      min: -2,
      max: 4,
    },
  };

  const canvasDimensions = {
    width: 100 * (cartesianPlane.x.max - cartesianPlane.x.min),
    height: 100 * (cartesianPlane.y.max - cartesianPlane.y.min),
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (canvasModel) {
      window.requestAnimationFrame(step);
    } else {
      setCanvasModel(new CanvasModel(canvasRef.current.getContext('2d')!, canvasDimensions, cartesianPlane));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasModel]);

  function step(time: DOMHighResTimeStamp) {
    if (!canvasModel) {
      return;
    }

    canvasModel.context.clearRect(0, 0, canvasModel.dimensions.width, canvasModel.dimensions.height);
    const leftCirclePoint = Point.withGetCurrentCoords((t) => {
      const rotation = t * 0.004;
      return {
        x: Math.cos(rotation),
        y: Math.sin(rotation),
      };
    }, canvasModel);

    const rightCirclePoint = Point.withGetCurrentCoords((t) => {
      const rotation = t * 0.003;
      return {
        x: 3 - Math.cos(rotation),
        y: 1 - Math.sin(rotation),
      };
    }, canvasModel);

    const drawables: Array<Drawable> = [leftCirclePoint, rightCirclePoint];

    drawables.forEach((d) => d.draw(time));

    window.requestAnimationFrame(step);
  }

  return (
    <div className={styles.app}>
      <Canvas
        ref={canvasRef}
        className={styles.canvas}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        onContextMenu={(e: CanvasMouseEvent) => {
          e.preventDefault();
        }}
      ></Canvas>
    </div>
  );
}

export default App;
