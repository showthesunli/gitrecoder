import "./style.css";
import { Canvas, Rect, Circle } from "fabric";

const canvas = new Canvas("c");

const rect = new Rect({
  left: 250,
  top: 250,
  fill: "red",
  width: 500,
  height: 500,
  originX: "center",
  originY: "center",
});

canvas.add(rect);

rect.set({
  left: "300",
});

rect.setCoords();
canvas.renderAll();

const circle = new Circle({
  left: 250,
  top: 250,
  fill: "blue",
  radius: 250,
  originX: "center",
  originY: "center",
});

canvas.add(circle);
