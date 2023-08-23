import { PackFileConfig } from "../assetpacks/pack-file.config";
import { UIManager } from "../ui.manager";
import { ScenesEnum } from "./scenes";

export class Scene extends Phaser.Scene {
  screenCenterX: number;
  screenCenterY: number;
  gameWidth: number;
  gameHeight: number;
  currentScene: ScenesEnum;
  uiManager: UIManager = new UIManager(this);
  backgroundSound: Phaser.Sound.BaseSound;

  constructor(key: ScenesEnum) {
    super({ key });
  }

  LoadProps() {
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
    this.screenCenterX = this.gameWidth * 0.5;
    this.screenCenterY = this.gameHeight * 0.5;
    this.currentScene = this.scene.key as ScenesEnum;
    this.uiManager.create();
  }

  AssetPackLoader(packs: PackFileConfig[]) {
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
