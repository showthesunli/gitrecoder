import "./style.css";
import * as fabric from "fabric";
import { createScreenCaptureVideo } from './lib/capture';

const canvas = new fabric.Canvas("c");

const clipPath = new fabric.Circle({
  radius: 40,
  top: -40,
  left: -40,
});
const rect = new fabric.Rect({
  width: 200,
  height: 100,
  fill: "red",
});
rect.clipPath = clipPath;

canvas.add(rect);

const img = await fabric.FabricImage.fromURL("/unnamed.png");
const clipPath1 = new fabric.Circle({
  radius: 40,
  originX: "center",
  originY: "center",
});
img.clipPath = clipPath1;
canvas.add(img);

document.getElementById('addScreenCapture')!.addEventListener('click', async () => {
  try {
    const video = await createScreenCaptureVideo({
      controls: true,
      muted: true
    });
    
    const videoImage = await fabric.FabricImage.fromElement(video, {
      left: 100,
      top: 100,
      originX: 'center' as const,
      originY: 'center' as const,
      angle: 15,
      scaleX: 0.5,
      scaleY: 0.5
    });

    canvas.add(videoImage);
    canvas.requestRenderAll();
  } catch (error) {
    console.error('添加屏幕捕获失败:', error);
    alert(`屏幕捕获失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
});
