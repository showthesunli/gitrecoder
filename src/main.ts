import "./style.css";
import { initializeCanvas } from "./lib/canvas";
import { createWheelHandler } from "./lib/event-handlers";
import { handleScreenCaptureClick, exportToGIF } from "./lib/screen-capture";

/**
 * 应用主入口函数
 * 职责：
 * 1. 初始化画布实例
 * 2. 绑定事件处理器
 * 3. 连接UI交互与业务逻辑
 */
const main = () => {
  // 初始化画布并绑定滚轮缩放事件
  const canvas = initializeCanvas();
  canvas.on("mouse:wheel", createWheelHandler(canvas));

  // 获取UI元素引用
  const captureButton = document.getElementById("addScreenCapture");
  const exportButton = document.getElementById("exportCanvas2gif");

  // 安全绑定事件监听（空值检查）
  if (captureButton) {
    captureButton.addEventListener("click", () =>
      handleScreenCaptureClick(canvas) // 传入当前画布实例
    );
  }

  if (exportButton) {
    exportButton.addEventListener("click", () =>
      exportToGIF(canvas) // 保持函数式风格，显式传递依赖
    );
  }
};

// 启动应用
main();
