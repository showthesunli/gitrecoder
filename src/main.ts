/**
 * 应用程序主入口模块
 * @packageDocumentation
 * @module Main
 * @remarks
 * 核心职责：
 * - 初始化画布实例
 * - 绑定UI事件监听器
 * - 协调功能模块初始化
 * - 应用生命周期管理
 */

import "./style.css";
import * as fabric from "fabric";

declare module "fabric" {
  interface Canvas {
    isDragging?: boolean;
    lastPosX?: number;
    lastPosY?: number;
  }
}
import { handleScreenCaptureClick, exportToGIF } from "./lib/screen-capture";

/**
 * 纯函数缩放计算器
 * @param currentZoom 当前缩放比例
 * @param delta 滚轮变化量
 * @returns 计算后的新缩放比例
 */
const calculateZoom = (currentZoom: number, delta: number): number => {
  const newZoom = currentZoom * (0.999 ** delta);
  return Math.min(Math.max(newZoom, 0.01), 20);
};

/**
 * 创建滚轮事件处理器
 * @param canvas Fabric画布实例
 * @returns 配置好的滚轮事件处理器
 */
const createWheelHandler = (canvas: fabric.Canvas) => (opt: fabric.IEvent<WheelEvent>) => {
  const { deltaY: delta, offsetX, offsetY } = opt.e;
  const zoomPoint = new fabric.Point(offsetX, offsetY);
  
  canvas.zoomToPoint(zoomPoint, calculateZoom(canvas.getZoom(), delta));
  
  opt.e.preventDefault();
  opt.e.stopPropagation();
};

/**
 * 初始化并返回Fabric画布实例
 * @returns 配置完成的Fabric画布实例 {@link fabric.Canvas}
 * @remarks
 * 使用默认配置初始化画布：
 * - 绑定到ID为'c'的DOM元素
 * - 启用默认交互模式
 *
 * @example
 * ```typescript
 * const canvas = initializeCanvas();
 * canvas.add(new fabric.Rect({ width: 100, height: 100 }));
 * ```
 */
const initializeCanvas = (): fabric.Canvas => {
  const canvas = new fabric.Canvas("c");
  canvas.on("mouse:wheel", createWheelHandler(canvas));
  return canvas;
};

/**
 * 主初始化函数
 * @remarks
 * 应用启动流程：
 * 1. 初始化画布实例
 * 2. 获取UI元素引用
 * 3. 绑定事件监听器
 * 4. 完成启动准备
 *
 * @example
 * ```typescript
 * // 应用入口文件
 * main();
 * ```
 */
const main = () => {
  const canvas = initializeCanvas();
  const captureButton = document.getElementById("addScreenCapture");
  const exportButton = document.getElementById("exportCanvas2gif");

  if (captureButton) {
    captureButton.addEventListener("click", () =>
      handleScreenCaptureClick(canvas)
    );
  }

  if (exportButton) {
    exportButton.addEventListener("click", () =>
      exportToGIF(canvas)
    );
  }
};

// 启动应用
main();
