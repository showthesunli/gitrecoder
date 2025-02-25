import "./style.css";
import * as fabric from "fabric";

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
