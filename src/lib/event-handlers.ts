import { Point, Canvas, TEvent } from "fabric";
import { calculateZoom } from "./utils";

export const createWheelHandler =
  (canvas: Canvas) => (opt: TEvent<WheelEvent>) => {
    const { deltaY: delta, offsetX, offsetY } = opt.e;
    const zoomPoint = new Point(offsetX, offsetY);

    canvas.zoomToPoint(zoomPoint, calculateZoom(canvas.getZoom(), delta));

    opt.e.preventDefault();
    opt.e.stopPropagation();
  };
