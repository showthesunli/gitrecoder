import { fabric } from "fabric";

declare module "fabric" {
  interface Canvas {
    isDragging?: boolean;
    lastPosX?: number;
    lastPosY?: number;
  }
}

export const initializeCanvas = (): fabric.Canvas => {
  return new fabric.Canvas("c");
};
