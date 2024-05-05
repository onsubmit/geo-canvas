import { ComponentPropsWithoutRef, forwardRef } from 'react';

type CanvasProps = ComponentPropsWithoutRef<'canvas'>;

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(
  (props: CanvasProps, ref: React.ForwardedRef<HTMLCanvasElement>) => {
    return <canvas ref={ref} {...props}></canvas>;
  }
);

Canvas.displayName = 'Canvas';
export { Canvas };
