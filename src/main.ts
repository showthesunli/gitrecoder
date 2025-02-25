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
      console.error("Oops, screen capture failed:", error);
      alert(
        `Whoops! Screen capture failed: ${error instanceof Error ? error.message : "unknown error"}`
      );
    }
  });
