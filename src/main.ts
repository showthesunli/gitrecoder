// 导入样式文件
import "./style.css";
// 导入图形库和屏幕捕捉工具
import * as fabric from "fabric";
import { createScreenCaptureVideo } from "./lib/capture";

/** 初始化并返回fabric画布实例（保持原生API调用不变） */
const initializeCanvas = (): fabric.Canvas => {
  return new fabric.Canvas("c");
};

/** 创建视频图像对象（保持fabric原生API调用方式） */
const createVideoImageObject = (video: HTMLVideoElement): fabric.FabricImage => {
  return new fabric.FabricImage(video, {
    width: video.videoWidth,
    height: video.videoHeight,
    objectCaching: false,
  });
};

/** 启动画布渲染循环（保持fabric原生动画API调用方式） */
const startRenderLoop = (canvas: fabric.Canvas): void => {
  const renderFrame = () => {
    canvas.renderAll();
    fabric.util.requestAnimFrame(renderFrame);
  };
  fabric.util.requestAnimFrame(renderFrame);
};

/** 处理屏幕捕捉按钮点击事件 */
const handleScreenCaptureClick = async (canvas: fabric.Canvas) => {
  try {
    // 创建屏幕捕捉视频流（保持原有参数配置）
    const video = await createScreenCaptureVideo({ controls: false, muted: true });
    
    // 创建并添加视频图像对象到画布
    const videoImage = createVideoImageObject(video);
    canvas.add(videoImage);
    
    // 启动渲染循环
    startRenderLoop(canvas);
  } catch (error) {
    handleCaptureError(error);
  }
};

/** 统一错误处理函数 */
const handleCaptureError = (error: unknown): void => {
  console.error("屏幕捕捉失败:", error);
  alert(`操作失败: ${error instanceof Error ? error.message : "未知错误"}`);
};

// 主初始化函数
const main = () => {
  // 初始化画布
  const canvas = initializeCanvas();
  
  // 获取按钮元素并添加事件监听
  const captureButton = document.getElementById("addScreenCapture");
  if (captureButton) {
    captureButton.addEventListener("click", () => handleScreenCaptureClick(canvas));
  }
};

// 执行主程序
main();
