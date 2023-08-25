import { SceneInterface } from "../interfaces/scene.interface";
import { PackFileConfigModel } from "../models";

export class Scene extends Phaser.Scene implements SceneInterface {
  screenCenterX: number;
  screenCenterY: number;
  gameWidth: number;
  gameHeight: number;
  backgroundSound: Phaser.Sound.BaseSound;

  constructor(key: string) {
    super({ key });
  }

  ScenePreload() {
    this.gameWidth = this.game.config.width as number;
    this.gameHeight = this.game.config.height as number;
    this.screenCenterX = this.gameWidth * 0.5;
    this.screenCenterY = this.gameHeight * 0.5;
  }

  SceneCreate() {
    window.screen.orientation.lock("portrait");
    this.scale.on("resize", this.resize, this);
    this.scale.on("orientationchange", this.orientationChange, this);
    
  }

  private orientationChange(orientation: string) {
    this.recalibrate();
    // if (orientation.includes("portrait")) {
    //   this.scale.setGameSize(this.gameWidth, this.gameHeight);
    // } else {
    //   this.scale.setGameSize(this.gameHeight, this.gameWidth);
    // }
  }

  private recalibrate() {
    this.screenCenterX = this.gameWidth * 0.5;
    this.screenCenterY = this.gameHeight * 0.5;
  }

  private resize(gameSize: Phaser.Structs.Size) {
    const { width, height } = gameSize;
    this.screenCenterX = width * 0.5;
    this.screenCenterY = height * 0.5;
    this.cameras.resize(width, height);
    this.recalibrate();
  }

  calculatePercentage = (percentage: number, total: number) => {
    return (percentage / 100) * total;
  };

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
