// 屏幕捕捉功能模块

import * as fabric from "fabric";
import { createScreenCaptureVideo } from "./capture";

/** 创建视频图像对象（保持fabric原生API调用方式） */
export const createVideoImageObject = (video: HTMLVideoElement): fabric.FabricImage => {
  return new fabric.FabricImage(video, {
    width: video.videoWidth,
    height: video.videoHeight,
    objectCaching: false,
  });
};

/** 启动画布渲染循环（保持fabric原生动画API调用方式） */
export const startRenderLoop = (canvas: fabric.Canvas): void => {
  const renderFrame = () => {
    canvas.renderAll();
    fabric.util.requestAnimFrame(renderFrame);
  };
  fabric.util.requestAnimFrame(renderFrame);
};

/** 处理屏幕捕捉按钮点击事件 */
export const handleScreenCaptureClick = async (canvas: fabric.Canvas) => {
  try {
    const video = await createScreenCaptureVideo({ controls: false, muted: true });
    const videoImage = createVideoImageObject(video);
    canvas.add(videoImage);
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
