interface Point3D {
  x: number;
  y: number;
  z: number;
}

type rawDepthCallbackFunc = (pointCloud: Array<Point3D>) => void;

interface IPointCloudProvider {
  /**
   *
   * @param fn callback func that is called when data received
   */
  onReceivePointCloud(fn: rawDepthCallbackFunc);

  /**
   * start provider client
   */
  start(): void;
}

export { Point3D, IPointCloudProvider, rawDepthCallbackFunc };
