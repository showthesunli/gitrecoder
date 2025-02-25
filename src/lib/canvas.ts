import { Canvas } from "fabric";

declare module "fabric" {
  interface Canvas {
    isDragging?: boolean;
    lastPosX?: number;
    lastPosY?: number;
  }
}

export const initializeCanvas = (): Canvas => {
  return new Canvas("c");
};
