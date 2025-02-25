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

/**
 * 创建并配置用于显示屏幕捕获流的视频元素
 * 
 * @param options 视频元素配置选项
 * @returns 已绑定屏幕捕获流的视频元素Promise
 * 
 * @example
 * createScreenCaptureVideo().then(video => {
 *   document.body.appendChild(video);
 * });
 */
export async function createScreenCaptureVideo(
  options: { autoplay?: boolean; controls?: boolean; muted?: boolean } = {}
): Promise<HTMLVideoElement> {
  const video = document.createElement('video');
  
  // 设置默认视频属性（自动播放且静音以避免浏览器策略限制）
  video.autoplay = options.autoplay ?? true;
  video.controls = options.controls ?? false;
  video.muted = options.muted ?? true;

  try {
    // 获取屏幕捕获流并绑定到视频元素
    const stream = await captureScreen();
    video.srcObject = stream;
    
    // 在流停止时自动清理资源
    stream.getVideoTracks()[0].addEventListener('ended', () => {
      video.srcObject = null;
    });

    return video;
  } catch (error) {
    // 捕获失败时移除视频引用
    video.remove();
    throw error;
  }
}
