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
import { handleScreenCaptureClick } from "./lib/screen-capture";

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

  canvas.on("mouse:wheel", function (opt) {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint(new fabric.Point(opt.e.offsetX, opt.e.offsetY), zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
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

  if (captureButton) {
    captureButton.addEventListener("click", () =>
      handleScreenCaptureClick(canvas)
    );
  }
};

// 启动应用
main();
