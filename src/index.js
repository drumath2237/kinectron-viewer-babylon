import Lib from './lib.ts';

export default class App {
  /**
   * entry point
   */
  static main() {
    const hello = new Lib('hello');
    console.log(hello);
    // const kinectron = new Kinectron("127.0.0.1");
    // const rawDepthWidth = 640 / 2;
    // const rawDepthHeight = 576 / 2;

    // kinectron.setKinectType("azure");
    // kinectron.makeConnection();

    // kinectron.startRawDepth((depthBuffer) => {
    //   console.log(depthBuffer);
    // });
  }
}
