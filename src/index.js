import { Kinectron } from "/src/kinectron-client/kinectron-client";

export default class App {
  /**
   * entry point
   */
  static main() {
    const kinectron = new Kinectron("127.0.0.1");
    const rawDepthWidth = 640 / 2;
    const rawDepthHeight = 576 / 2;

    kinectron.setKinectType("azure");
    kinectron.makeConnection();

    kinectron.startRawDepth((depthBuffer) => {
      console.log("aa");
    });
  }
}
