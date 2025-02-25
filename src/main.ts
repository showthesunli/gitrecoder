/**
 * 应用程序主入口模块
 * 
 * 负责初始化画布实例、绑定UI事件监听器
 * 协调各功能模块的初始化及交互
 */

import "./style.css";
import * as fabric from "fabric";
import { handleScreenCaptureClick } from "./lib/screen-capture";

/** 初始化并返回fabric画布实例 */
const initializeCanvas = (): fabric.Canvas => {
  return new fabric.Canvas("c");
};

// 主初始化函数
const main = () => {
  const canvas = initializeCanvas();
  const captureButton = document.getElementById("addScreenCapture");
  
  if (captureButton) {
    captureButton.addEventListener("click", () => handleScreenCaptureClick(canvas));
  }
};

// 启动应用
main();
