import "./style.css";
import { initializeCanvas } from "./lib/canvas";
import { createWheelHandler } from "./lib/event-handlers";
import { handleScreenCaptureClick, exportToGIF } from "./lib/screen-capture";

const main = () => {
  const canvas = initializeCanvas();
  canvas.on("mouse:wheel", createWheelHandler(canvas));

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

main();
