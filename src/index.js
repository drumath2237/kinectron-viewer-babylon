import BabylonScene from './BabylonScene/babylonScnene.ts';
import KinectronProvider from './PointCloudProvider/KinectronProvider';

export default class App {
  /**
   * entry point
   */
  static async main() {
    const canvas = document.getElementById('renderCanvas');
    if (!canvas) {
      return;
    }

    const scene = new BabylonScene(canvas);

    // eslint-disable-next-line no-undef
    const kinectron = new Kinectron('127.0.0.1');

    const provider = new KinectronProvider(kinectron);
    provider.onReceivePointCloud((pointCloud) => {
      scene.Vertices = pointCloud;
    });
    provider.start();

    await scene.startSceneAsync();
  }
}
