import { Point, Canvas, TEvent } from "fabric";
import { calculateZoom } from "./utils";

/**
 * 创建滚轮事件处理器的高阶函数
 * 通过闭包绑定特定 canvas 实例，实现无状态事件处理
 * 符合函数式编程的纯函数原则（除入参外无外部依赖）
 */
export const createWheelHandler =
  (canvas: Canvas) => (opt: TEvent<WheelEvent>) => {
    // 从事件对象解构需要的参数
    const { deltaY: delta, offsetX, offsetY } = opt.e;
    
    // 创建基于鼠标位置的缩放锚点
    const zoomPoint = new Point(offsetX, offsetY);

    // 调用工具函数计算新缩放比例并应用
    canvas.zoomToPoint(zoomPoint, calculateZoom(canvas.getZoom(), delta));

    // 阻止事件冒泡和默认行为（避免页面滚动）
    opt.e.preventDefault();
    opt.e.stopPropagation();
  };
