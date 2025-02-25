import { Canvas } from "fabric";

// 扩展 fabric 类型声明，为 Canvas 添加拖拽状态跟踪属性
declare module "fabric" {
  interface Canvas {
    isDragging?: boolean;    // 标记画布是否处于拖拽状态
    lastPosX?: number;       // 记录上次鼠标X坐标
    lastPosY?: number;       // 记录上次鼠标Y坐标
  }
}

/**
 * 画布初始化工厂函数
 * 返回配置好的 fabric.Canvas 实例
 * 集中管理画布创建逻辑，便于后续扩展配置项
 */
export const initializeCanvas = (): Canvas => {
  return new Canvas("c");  // 'c' 对应 HTML canvas 元素的 ID
};
