interface IKinectronClient {
  /**
   * set kinect type azure kinect or kinect for windows
   */
  setKinectType(kinectType: 'azure' | 'windows'): void;

  /**
   * start to connect kinectron server
   */
  makeConnection();

  /**
   * set callback func that operates raw depth buffer
   * @param rawDepthCallback raw depth callback function
   */
  startRawDepth(rawDepthCallback: (buffer: Array<number>) => void): void;
}

const kinectronRawDepthResolution = {
  width: 640 / 2,
  height: 579 / 2,
};

export { IKinectronClient, kinectronRawDepthResolution };
