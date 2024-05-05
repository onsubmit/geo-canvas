import './App.css';

import { useEffect, useRef, useState } from 'react';

import { Canvas } from './components/canvas';

type CanvasMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    if (context) {
      redraw(canvasRef.current);
    } else {
      setContext(canvasRef.current.getContext('2d'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  function getContext() {
    if (!context) {
      throw new Error('No context');
    }

    return context;
  }

  function redraw(canvas: HTMLCanvasElement) {
    getContext().clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <Canvas
      ref={canvasRef}
      width="1000"
      height="1000"
      onContextMenu={(e: CanvasMouseEvent) => {
        e.preventDefault();
      }}
    ></Canvas>
  );
}

export default App;
