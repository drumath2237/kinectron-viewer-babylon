import { kinectronRawDepthResolution } from './Kinectron/kinectronClient';
import DepthMapUtil from './PointCloudProvider/depthDataUtil';

export default class App {
  /**
   * entry point
   */
  static main() {
    // eslint-disable-next-line no-undef
    // const kinectron = new Kinectron('127.0.0.1');

    // const provider = new KinectronProvider(kinectron);
    // provider.onReceivePointCloud((pointCloud) => {
    //   console.log(pointCloud);
    // });
    // provider.start();

    const w = kinectronRawDepthResolution.width;
    const h = kinectronRawDepthResolution.height;
    const fovYrad = (65 * Math.PI) / 180;
    const focal = 1.0 / Math.tan(fovYrad / 2);

    const uv = DepthMapUtil.pixelIndex2UV(0, w, h);
    console.log(uv);

    const xyz = DepthMapUtil.uvd2Xyz(uv, 1.2, focal);
    console.log(xyz);
  }
}
