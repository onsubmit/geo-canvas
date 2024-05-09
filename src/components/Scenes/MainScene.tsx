import { useEffect, useRef, useState } from 'react';

import { CanvasModel } from '../../CanvasModel';
import { Colors } from '../../Colors';
import { Circle } from '../../Drawables/Circle';
import { LineSegment } from '../../Drawables/LineSegment';
import { Point } from '../../Drawables/Point';
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
        min: -10,
        max: 10,
      },
      y: {
        min: -10,
        max: 10,
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
    const stationaryCircles: Array<Circle> = [
      new Circle({
        origin: PointFactory.constant({ x: -2, y: -2 }),
        radius: 1.5,
        color: Colors.veryLightGrey,
      }),
      new Circle({
        origin: PointFactory.constant({ x: -2, y: 2 }),
        radius: 1.5,
        color: Colors.veryLightGrey,
      }),
      new Circle({
        origin: PointFactory.constant({ x: 2, y: -2 }),
        radius: 1.5,
        color: Colors.veryLightGrey,
      }),
      new Circle({
        origin: PointFactory.constant({ x: 2, y: 2 }),
        radius: 1.5,
        color: Colors.veryLightGrey,
      }),
    ];

    const pointsAroundStationaryCircles: Array<Point> = [
      PointFactory.aroundCircle({
        circle: stationaryCircles[0]!,
        speed: 0.01,
        direction: 'clockwise',
      }),
      PointFactory.aroundCircle({
        circle: stationaryCircles[1]!,
        speed: 0.015,
      }),
      PointFactory.aroundCircle({
        circle: stationaryCircles[2]!,
        speed: 0.01,
        direction: 'clockwise',
      }),
      PointFactory.aroundCircle({
        circle: stationaryCircles[3]!,
        speed: 0.015,
      }),
    ];

    const circlesAroundPointsAroundStationaryCircles: Array<Circle> = [
      new Circle({
        origin: pointsAroundStationaryCircles[0]!,
        radius: 3.7,
        color: Colors.veryLightGrey,
      }),
      new Circle({
        origin: pointsAroundStationaryCircles[1]!,
        radius: 3.8,
        color: Colors.veryLightGrey,
      }),
      new Circle({
        origin: pointsAroundStationaryCircles[2]!,
        radius: 3.9,
        color: Colors.veryLightGrey,
      }),
      new Circle({
        origin: pointsAroundStationaryCircles[3]!,
        radius: 4,
        color: Colors.veryLightGrey,
      }),
    ];

    const circleIntersections1 = PointFactory.circleIntersections(
      circlesAroundPointsAroundStationaryCircles[0]!,
      circlesAroundPointsAroundStationaryCircles[1]!
    );

    const circleIntersections2 = PointFactory.circleIntersections(
      circlesAroundPointsAroundStationaryCircles[2]!,
      circlesAroundPointsAroundStationaryCircles[3]!
    );

    const linesToIntersections = [
      new LineSegment({
        point1: pointsAroundStationaryCircles[0]!,
        point2: circleIntersections1[1]!,
        color: Colors.veryLightGrey,
      }),
      new LineSegment({
        point1: pointsAroundStationaryCircles[1]!,
        point2: circleIntersections2[1]!,
        color: Colors.veryLightGrey,
      }),
    ];

    const circlesCenteredAtIntersection: Array<Circle> = [
      new Circle({
        origin: circleIntersections1[1],
        radius: 2,
        color: Colors.veryLightGrey,
      }),
      new Circle({
        origin: circleIntersections2[0],
        radius: 2,
        color: Colors.veryLightGrey,
      }),
    ];

    const circlesCenteredAtIntersectionPoint: Array<Point> = [
      PointFactory.aroundCircle({
        circle: circlesCenteredAtIntersection[0]!,
        speed: 0.0001,
        color: Colors.red,
      }),
      PointFactory.aroundCircle({
        circle: circlesCenteredAtIntersection[1]!,
        speed: 0.0001,
        color: Colors.blue,
      }),
    ];

    circlesCenteredAtIntersectionPoint[0]!.toggleTracing();
    circlesCenteredAtIntersectionPoint[1]!.toggleTracing();

    setSceneProps((prev) => {
      if (!prev) {
        return null;
      }

      return {
        background: {
          canvasModel: prev.background?.canvasModel ?? null,
          drawables: [
            ...stationaryCircles,
            ...pointsAroundStationaryCircles,
            ...circlesAroundPointsAroundStationaryCircles,
            ...circleIntersections1,
            ...circleIntersections2,
            ...linesToIntersections,
            ...circlesCenteredAtIntersection,
          ],
        },
        trace: {
          canvasModel: prev.trace?.canvasModel ?? null,
          drawables: [...circlesCenteredAtIntersectionPoint],
        },
      };
    });
  }

  return <Scene ref={sceneCanvasesRef} background={sceneProps?.background} trace={sceneProps?.trace} />;
}

export default MainScene;
