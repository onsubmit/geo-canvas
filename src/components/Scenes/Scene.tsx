import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { Drawable } from '../../Drawables/Drawable';
import Drawer from '../../Drawer';
import { Canvas } from '../Canvas';
import styles from './Scene.module.css';

export type SceneLayer = {
  canvasModel: CanvasModel | null;
  drawables: Array<Drawable>;
};

export type SceneProps = {
  background: SceneLayer | undefined;
  trace: SceneLayer | undefined;
};

export type SceneCanvases = {
  background: HTMLCanvasElement | null;
  trace: HTMLCanvasElement | null;
};

const Scene = forwardRef<SceneCanvases, SceneProps>(function Scene(
  { background, trace }: SceneProps,
  ref: React.ForwardedRef<SceneCanvases>
) {
  const backgroundRef = useRef<HTMLCanvasElement | null>(null);
  const traceRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!background?.canvasModel || !trace?.canvasModel) {
      return;
    }

    function step(time: DOMHighResTimeStamp) {
      if (!background?.canvasModel || !trace?.canvasModel) {
        return;
      }

      const backgroundDrawer = new Drawer(background.canvasModel);
      const traceDrawer = new Drawer(trace.canvasModel);

      backgroundDrawer.clear();
      background.drawables.forEach((d) => backgroundDrawer.draw(d, time));
      trace.drawables.forEach((d) => traceDrawer.draw(d, time));

      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }, [background, trace]);

  useImperativeHandle(
    ref,
    (): SceneCanvases => {
      return {
        background: backgroundRef.current,
        trace: traceRef.current,
      };
    },
    []
  );

  return (
    <>
      <Canvas
        ref={backgroundRef}
        className={styles.canvas}
        width={background?.canvasModel?.canvasDimensions.width ?? 0}
        height={background?.canvasModel?.canvasDimensions.height ?? 0}
      />
      <Canvas
        ref={traceRef}
        className={styles.canvas}
        width={trace?.canvasModel?.canvasDimensions.width ?? 0}
        height={trace?.canvasModel?.canvasDimensions.height ?? 0}
      />
    </>
  );
});

export default Scene;
