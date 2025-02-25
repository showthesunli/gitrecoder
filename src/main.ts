import "./style.css";
import * as fabric from "fabric";
import { createScreenCaptureVideo } from "./lib/capture";

const canvas = new fabric.Canvas("c");

document
  .getElementById("addScreenCapture")!
  .addEventListener("click", async () => {
    try {
      const video = await createScreenCaptureVideo({
        controls: false,
        muted: true,
      });

      const videoImage = new fabric.FabricImage(video, {
        originX: "center",
        originY: "center",
        objectCaching: false,
        scaleX: 0.5,
        scaleY: 0.5,
      });

      canvas.add(videoImage);
      fabric.util.requestAnimFrame(function render() {
        canvas.renderAll();
        fabric.util.requestAnimFrame(render);
      });
    } catch (error) {
      console.error("添加屏幕捕获失败:", error);
      alert(
        `屏幕捕获失败: ${error instanceof Error ? error.message : "未知错误"}`
      );
    }
  });
