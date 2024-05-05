import { forwardRef, useEffect } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { Drawable } from '../../Drawables/Drawable';
import { Canvas } from '../Canvas';
import styles from './Scene.module.css';

type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

export type SceneProps = {
  canvasModel: CanvasModel | null;
  drawables: Array<Drawable>;
};

const Scene = forwardRef<HTMLCanvasElement, SceneProps>(function Scene(
  { canvasModel, drawables }: SceneProps,
  ref: React.ForwardedRef<HTMLCanvasElement>
) {
  useEffect(() => {
    if (!canvasModel) {
      return;
    }

    function step(time: DOMHighResTimeStamp) {
      if (!canvasModel) {
        return;
      }

      canvasModel.context.clearRect(0, 0, canvasModel.dimensions.width, canvasModel.dimensions.height);
      drawables.forEach((d) => d.draw(time));

      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }, [canvasModel, drawables]);

  return (
    <Canvas
      ref={ref}
      className={styles.canvas}
      width={canvasModel?.dimensions.width ?? 0}
      height={canvasModel?.dimensions.height ?? 0}
      onContextMenu={(e: CanvasMouseEvent) => {
        e.preventDefault();
      }}
    ></Canvas>
  );
});

export default Scene;
