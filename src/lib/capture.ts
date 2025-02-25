export async function captureScreen(): Promise<MediaStream> {
  try {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      throw new Error('Screen capture not supported');
    }

    return await navigator.mediaDevices.getDisplayMedia({
      video: {
        frameRate: 30
      },
      audio: false
    });
  } catch (error) {
    throw new Error(`Screen capture failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
