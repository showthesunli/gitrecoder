import { fabric } from "fabric";
import { calculateZoom } from "./utils";

export const createWheelHandler = (canvas: fabric.Canvas) => (opt: fabric.IEvent<WheelEvent>) => {
  const { deltaY: delta, offsetX, offsetY } = opt.e;
  const zoomPoint = new fabric.Point(offsetX, offsetY);
  
  canvas.zoomToPoint(zoomPoint, calculateZoom(canvas.getZoom(), delta));
  
  opt.e.preventDefault();
  opt.e.stopPropagation();
};
