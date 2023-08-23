import { PackFileConfig } from "./pack-file.config";
export function AssetPackLoader(packs: PackFileConfig[], scene: Phaser.Scene) {
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
