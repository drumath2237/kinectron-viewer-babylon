import {
  IKinectronClient,
  kinectronRawDepthResolution,
} from '../Kinectron/kinectronClient';
import DepthMapUtil from './depthDataUtil';
import {
  IPointCloudProvider,
  Point3D,
  rawDepthCallbackFunc,
} from './pointCloudProvider';

class KinectronProvider implements IPointCloudProvider {
  private kinectronClient: IKinectronClient;

  private onDataReceivedFunc?: rawDepthCallbackFunc;

  private depth2PointCloudTable: Array<Point3D>;

  private width: number;

  private height: number;

  constructor(kinectron: IKinectronClient) {
    this.kinectronClient = kinectron;
    this.kinectronClient.setKinectType('azure');

    this.width = kinectronRawDepthResolution.width;
    this.height = kinectronRawDepthResolution.height;

    const focal = 1.0 / Math.tan((65 * Math.PI) / 180 / 2);

    this.depth2PointCloudTable = [];
    for (let i = 0; i < this.width * this.height; i++) {
      const uv = DepthMapUtil.pixelIndex2UV(i, this.width, this.height);
      const operator = DepthMapUtil.uvd2XyzOperator(uv, focal);
      this.depth2PointCloudTable.push(operator);
    }
  }

  public start(): void {
    this.kinectronClient.makeConnection();
    this.kinectronClient.startRawDepth(this.onRawDepth);
  }

  private onRawDepth = (depthBuffer: Array<number>): void => {
    if (!depthBuffer || depthBuffer.length !== this.width * this.height) {
      return;
    }

    if (!this.onDataReceivedFunc) {
      return;
    }

    this.onDataReceivedFunc(
      depthBuffer.map<Point3D>((depth, bufferIndex) => {
        const d2pc = this.depth2PointCloudTable[bufferIndex];
        return {
          x: (depth * d2pc.x) / 1000,
          y: (depth * d2pc.y) / 1000,
          z: (depth * d2pc.z) / 1000,
        };
      })
    );
  };

  public onReceivePointCloud = (fn: rawDepthCallbackFunc): void => {
    this.onDataReceivedFunc = fn;
  };
}

export default KinectronProvider;
