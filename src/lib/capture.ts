/**
 * 捕获屏幕内容并返回媒体流
 * 
 * @remarks
 * 使用浏览器getDisplayMedia API实现屏幕捕获，默认配置30fps视频且不包含音频
 * 
 * @returns 包含屏幕内容的媒体流Promise
 * @throws 当浏览器不支持屏幕捕获或用户拒绝权限时抛出错误
 */
export async function captureScreen(): Promise<MediaStream> {
  try {
    // 检查浏览器是否支持屏幕捕获API
    if (!navigator.mediaDevices?.getDisplayMedia) {
      throw new Error('Screen capture not supported');
    }

    // 请求屏幕共享权限并获取媒体流
    return await navigator.mediaDevices.getDisplayMedia({
      video: {
        frameRate: 30 // 设置理想帧率为30fps（实际帧率取决于系统和硬件限制）
      },
      audio: false // 明确禁用音频捕获
    });
  } catch (error) {
    // 将原始错误转换为更友好的错误信息
    throw new Error(`Screen capture failed: ${
      error instanceof Error ? error.message : String(error)
    }`);
  }
}
