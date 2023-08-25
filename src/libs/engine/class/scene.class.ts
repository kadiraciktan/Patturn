import { PackFileConfigModel } from "../models";

export class Scene extends Phaser.Scene {
  screenCenterX: number;
  screenCenterY: number;
  gameWidth: number;
  gameHeight: number;
  backgroundSound: Phaser.Sound.BaseSound;

  constructor(key: string) {
    super({ key });
  }

  LoadProps() {
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
    this.screenCenterX = this.gameWidth * 0.5;
    this.screenCenterY = this.gameHeight * 0.5;
  }

  AssetPackLoader(packs: PackFileConfigModel[]) {
    packs.forEach((pack) => {
      switch (pack.type) {
        case "image":
          this.load.image(pack.key, pack.url);
          break;
        case "audio":
          this.load.audio(pack.key, pack.url);
          break;
        default:
          break;
      }
    });
  }
}
