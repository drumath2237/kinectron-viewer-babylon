interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface IPointCloudProvider {
  /**
   *
   * @param fn callback func that is called when data received
   */
  onReceivePointCloud(fn: (pointCloud: Array<Point3D>) => void);
}

export { Point3D, IPointCloudProvider };
