import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { Colors } from '../../Colors';
import { Circle } from '../../Drawables/Circle';
import { LineSegment } from '../../Drawables/LineSegment';
import { PointFactory } from '../../Drawables/PointFactory';
import { CartesianPlane } from '../CartesianPlane';
import Scene, { SceneCanvases, SceneProps } from './Scene';

function MainScene() {
  const CANVAS_SCALE = 80;

  const sceneCanvasesRef = useRef<SceneCanvases | null>(null);
  const [sceneProps, setSceneProps] = useState<SceneProps | null>(null);

  useEffect(() => {
    if (!sceneCanvasesRef.current?.background || !sceneCanvasesRef.current.trace) {
      return;
    }

    if (sceneProps?.background?.canvasModel && sceneProps.trace?.canvasModel) {
      draw();
      return;
    }

    const backgroundCanvasContext = sceneCanvasesRef.current.background.getContext('2d');
    if (!backgroundCanvasContext) {
      throw new Error('Could not get background canvas drawing context');
    }

    const traceCanvasContext = sceneCanvasesRef.current.trace.getContext('2d');
    if (!traceCanvasContext) {
      throw new Error('Could not get trace canvas drawing context');
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

    setSceneProps({
      background: {
        canvasModel: new CanvasModel(backgroundCanvasContext, CANVAS_SCALE, cartesianPlane),
        drawables: [],
      },
      trace: {
        canvasModel: new CanvasModel(traceCanvasContext, CANVAS_SCALE, cartesianPlane),
        drawables: [],
      },
    });
  }, [sceneProps?.background?.canvasModel, sceneProps?.trace?.canvasModel]);

  function draw() {
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
      speed: 0.001275,
    });

    const rightCirclePoint = PointFactory.aroundCircle({
      circle: rightCircle,
      speed: 0.0005,
      direction: 'clockwise',
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

    const linesToIntersections = [
      new LineSegment({ point1: leftCirclePoint, point2: circleIntersections1[1], color: Colors.lightGrey }),
      new LineSegment({ point1: rightCirclePoint, point2: circleIntersections1[1], color: Colors.lightGrey }),
    ];

    const circleCenteredAtIntersection = new Circle({
      origin: circleIntersections1[1],
      radius: 2,
      color: Colors.lightGrey,
    });

    const circleCenteredAtIntersectionPoint = PointFactory.aroundCircle({
      circle: circleCenteredAtIntersection,
      speed: 0.001,
    });

    circleCenteredAtIntersectionPoint.toggleTracing();

    setSceneProps((prev) => {
      if (!prev) {
        return null;
      }

      return {
        background: {
          canvasModel: prev.background?.canvasModel ?? null,
          drawables: [
            leftCircle,
            leftCirclePoint,
            rightCircle,
            rightCirclePoint,
            circleAroundLeftCirclePoint,
            circleAroundRightCirclePoint,
            circleIntersections1[0],
            circleIntersections1[1],
            ...linesToIntersections,
            circleCenteredAtIntersection,
          ],
        },
        trace: {
          canvasModel: prev.trace?.canvasModel ?? null,
          drawables: [circleCenteredAtIntersectionPoint],
        },
      };
    });
  }

  return <Scene ref={sceneCanvasesRef} background={sceneProps?.background} trace={sceneProps?.trace} />;
}

export default MainScene;
