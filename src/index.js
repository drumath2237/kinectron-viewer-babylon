import BabylonScene from './BabylonScene/babylonScnene.ts';

export default class App {
  /**
   * entry point
   */
  static async main() {
    // eslint-disable-next-line no-undef
    // const kinectron = new Kinectron('127.0.0.1');

    // const provider = new KinectronProvider(kinectron);
    // provider.onReceivePointCloud((pointCloud) => {
    //   console.log(pointCloud);
    // });
    // provider.start();

    const canvas = document.getElementById('renderCanvas');
    if (!canvas) {
      return;
    }

    const scene = new BabylonScene(canvas);
    await scene.startSceneAsync();
  }
}
