import {
  Color4,
  Engine,
  PointsCloudSystem,
  Scene,
  Vector3,
} from '@babylonjs/core';
import { kinectronRawDepthResolution } from '../Kinectron/kinectronClient';

class BabylonScene {
  private scene: Scene;

  private engine: Engine;

  private vertices?: Array<Vector3>;

  private pcs: PointsCloudSystem;

  public set Vertices(vertices: Array<Vector3>) {
    this.vertices = vertices;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);

    const pscBufferLength =
      kinectronRawDepthResolution.width * kinectronRawDepthResolution.height;

    this.pcs = new PointsCloudSystem('point cloud', 2, this.scene);

    this.pcs.addPoints(pscBufferLength);
    this.pcs.buildMeshAsync();

    this.pcs.updateParticle = (point) => {
      if (!this.vertices || this.vertices.length === 0) {
        return point;
      }

      //  eslint-disable-next-line no-param-reassign
      point.position.x = this.vertices[point.idx].x;
      point.position.y = this.vertices[point.idx].y;
      point.position.z = this.vertices[point.idx].z;

      return point;
    };
  }

  public startSceneAsync = () => {
    this.scene.createDefaultCameraOrLight(true, true, true);

    setInterval(() => {
      this.pcs.setParticles();
    }, 1000);

    this.scene.registerAfterRender(() => {
      this.pcs.setParticles();
    });
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  };
}

export default BabylonScene;
