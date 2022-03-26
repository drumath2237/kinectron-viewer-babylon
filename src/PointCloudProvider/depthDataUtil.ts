import { Point3D } from './pointCloudProvider';

type PointUV = { u: number; v: number };

class DepthMapUtil {
  /**
   * depth bufferのインデックスをピクセル位置に変換し、それを画像中心原点のuvに変換する
   * [0,h]->[-1,1], [0,w]->[-w/h, w/h]
   * @param index flatなピクセルインデックス値
   * @param width 横幅
   * @param height 縦幅
   * @returns 画像中心を原点とした縦幅を-1,1に正規化したUV値
   */
  public static pixelIndex2UV(
    index: number,
    width: number,
    height: number
  ): PointUV {
    // indexが画像の画素数より大きい場合に例外
    if (index < 0 || width * height <= index) {
      throw new Error('invalid pixel index');
    }

    const x = index % width;
    const y = Math.floor(index / width);

    const u = (2 * x - width) / height; // (aspect * (x - width / 2)) / (width / 2);
    const v = -((2 * y) / height - 1); // -(y - height / 2) / (height / 2);

    return { u, v };
  }

  /**
   * depth mapのdepth値から点群の3次元座標を計算する
   * @param uv 画像中心原点のUV座標
   * @param depth depth値
   * @param focalLength カメラの焦点距離
   * @returns depthから復元した3次元座標
   */
  public static uvd2Xyz(
    uv: PointUV,
    depth: number,
    focalLength: number
  ): Point3D {
    return {
      x:
        (depth * uv.u) /
        Math.sqrt(focalLength * focalLength + uv.u * uv.u + uv.v * uv.v),
      y:
        (depth * uv.v) /
        Math.sqrt(focalLength * focalLength + uv.u * uv.u + uv.v * uv.v),
      z:
        (depth * focalLength) /
        Math.sqrt(focalLength * focalLength + uv.u * uv.u + uv.v * uv.v),
    };
  }
}

export default DepthMapUtil;
