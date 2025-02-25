/**
 * Capture screen content and return media stream
 *
 * @remarks
 * Uses browser's getDisplayMedia API for screen capture, defaults to 30fps video without audio
 *
 * @returns Promise with media stream containing screen content
 * @throws Error when browser doesn't support screen capture or user denies permission
 */
export async function captureScreen(): Promise<MediaStream> {
  try {
    // Check if browser supports screen capture API
    if (!navigator.mediaDevices?.getDisplayMedia) {
      throw new Error("Screen capture not supported");
    }

    // Request screen sharing permission and get media stream
    return await navigator.mediaDevices.getDisplayMedia({
      video: {
        frameRate: 30, // Set ideal frame rate to 30fps (actual rate depends on system and hardware)
      },
      audio: false, // Explicitly disable audio capture
    });
  } catch (error) {
    // Convert original error to more friendly error message
    throw new Error(
      `Screen capture failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Create and configure video element for displaying screen capture stream
 *
 * @param options Video element configuration options
 * @returns Promise with video element bound to screen capture stream
 *
 * @example
 * createScreenCaptureVideo().then(video => {
 *   document.body.appendChild(video);
 * });
 */
export async function createScreenCaptureVideo(
  options: { autoplay?: boolean; controls?: boolean; muted?: boolean } = {}
): Promise<HTMLVideoElement> {
  const video = document.createElement("video");

  // Set default video properties (autoplay and muted to avoid browser policy restrictions)
  video.autoplay = options.autoplay ?? true;
  video.controls = options.controls ?? false;
  video.muted = options.muted ?? true;

  try {
    // Get screen capture stream and bind to video element
    const stream = await captureScreen();
    video.srcObject = stream;

    // Wait for video metadata to load
    await new Promise(resolve => video.addEventListener('loadedmetadata', resolve, { once: true }));
    
    // Set video dimensions (fixed width 500, height proportional)
    video.width = 500;
    video.height = 500 * (video.videoHeight / video.videoWidth);

    // Automatically clean up resources when stream ends
    stream.getVideoTracks()[0].addEventListener("ended", () => {
      video.srcObject = null;
    });

    return video;
  } catch (error) {
    // Remove video reference if capture fails
    video.remove();
    throw error;
  }
}
