import { Engine, MeshBuilder, Scene } from '@babylonjs/core';

class BabylonScene {
  private scene: Scene;

  private engine: Engine;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
  }

  public async startSceneAsync() {
    this.scene.createDefaultCameraOrLight(true, true, true);
    this.scene.createDefaultEnvironment();

    const boxSize = 1.0;
    const box = MeshBuilder.CreateBox('box', { size: boxSize });
    box.position.addInPlaceFromFloats(0, 0.5, 0);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}

export default BabylonScene;
