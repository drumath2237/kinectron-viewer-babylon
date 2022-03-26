import {
  IKinectronClient,
  kinectronRawDepthResolution,
} from '../Kinectron/kinectronClient';
import {
  IPointCloudProvider,
  Point3D,
  rawDepthCallbackFunc,
} from './pointCloudProvider';

class KinectronProvider implements IPointCloudProvider {
  private kinectronClient: IKinectronClient;

  private onDataReceivedFunc?: rawDepthCallbackFunc;

  constructor(kinectron: IKinectronClient) {
    this.kinectronClient = kinectron;
    this.kinectronClient.setKinectType('azure');
  }

  public start(): void {
    this.kinectronClient.makeConnection();
  }

  private onRawDepth(depthBuffer: Array<number>): void {
    if (
      depthBuffer &&
      depthBuffer.length !==
        kinectronRawDepthResolution.width * kinectronRawDepthResolution.height
    ) {
      return;
    }

    if (this.onDataReceivedFunc) {
      this.onDataReceivedFunc(
        depthBuffer.map<Point3D>((depth) => ({ x: depth, y: 0, z: 0 }))
      );
    }
  }

  public onReceivePointCloud(fn: rawDepthCallbackFunc): void {
    this.onDataReceivedFunc = fn;
  }
}

export default KinectronProvider;
