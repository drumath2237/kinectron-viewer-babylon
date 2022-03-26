import KinectronProvider from './PointCloudProvider/KinectronProvider';

export default class App {
  /**
   * entry point
   */
  static main() {
    // eslint-disable-next-line no-undef
    const kinectron = new Kinectron('127.0.0.1');

    const provider = new KinectronProvider(kinectron);
    provider.onReceivePointCloud((pointCloud) => {
      console.log(pointCloud);
    });
    provider.start();
  }
}
