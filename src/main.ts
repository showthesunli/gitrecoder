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
  
  // 获取新增按钮引用
  const addImageButton = document.getElementById("addImage");
  const addTextButton = document.getElementById("addText");
  const addShapeButton = document.getElementById("addShape");
  const drawToolButton = document.getElementById("drawTool");
  const undoButton = document.getElementById("undo");
  const redoButton = document.getElementById("redo");
  const deleteButton = document.getElementById("delete");

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
  
  // 为新增按钮添加临时事件监听器
  const notImplementedHandler = (feature: string) => () => {
    console.log(`功能"${feature}"尚未实现`);
  };
  
  if (addImageButton) {
    addImageButton.addEventListener("click", notImplementedHandler("添加图片"));
  }
  
  if (addTextButton) {
    addTextButton.addEventListener("click", notImplementedHandler("添加文本"));
  }
  
  if (addShapeButton) {
    addShapeButton.addEventListener("click", notImplementedHandler("添加形状"));
  }
  
  if (drawToolButton) {
    drawToolButton.addEventListener("click", notImplementedHandler("绘图工具"));
  }
  
  if (undoButton) {
    undoButton.addEventListener("click", notImplementedHandler("撤销"));
  }
  
  if (redoButton) {
    redoButton.addEventListener("click", notImplementedHandler("重做"));
  }
  
  if (deleteButton) {
    deleteButton.addEventListener("click", notImplementedHandler("删除"));
  }
};

// 启动应用
main();
