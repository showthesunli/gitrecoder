export const calculateZoom = (currentZoom: number, delta: number): number => {
  const newZoom = currentZoom * (0.999 ** delta);
  return Math.min(Math.max(newZoom, 0.01), 20);
};
