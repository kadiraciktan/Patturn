import { PackFileConfigModel } from "../models";
export function AssetPackLoader(
  packs: PackFileConfigModel[],
  scene: Phaser.Scene
) {
  packs.forEach((pack) => {
    switch (pack.type) {
      case "image":
        scene.load.image(pack.key, pack.url);
        break;
      case "audio":
        scene.load.audio(pack.key, pack.url);
        break;
      default:
        break;
    }
  });
}
