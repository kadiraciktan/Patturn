import { IngamePack, IngamePackKeysEnum } from "@patturn/assetpacks";
import { GameObject, IGameObject, MOUSE_EVENTS, Scene } from "@patturn/engine";

@GameObject()
export class SpinWheelGameObject implements IGameObject {
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  gameObject: Phaser.GameObjects.Image;
  isActive: boolean = false;
  currentSpeed: number = 1;
  constructor(public scene: Scene) {}
  preload() {
    this.scene.AssetPackLoader(IngamePack);
  }
  create() {
    this.gameObject = this.scene.add
      .image(
        this.scene.calculatePercentage(50, this.scene.gameWidth),
        this.scene.calculatePercentage(50, this.scene.gameHeight),
        IngamePackKeysEnum.YinYangWheel
      )
      .setScale(0.3)
      .setInteractive()
      .setVisible(this.isActive)
      .on("pointerdown", () => {
        this.events.emit(MOUSE_EVENTS.CLICK);
      });
  }
  update() {
    if (!this.isActive) return;
    this.gameObject.angle += this.currentSpeed;
  }

  show() {
    this.isActive = true;
    this.gameObject.setVisible(this.isActive);
  }

  hide() {
    this.isActive = false;
    this.gameObject.setVisible(this.isActive);
  }

  destroy() {
    this.gameObject.destroy();
    this.events.destroy();
  }
}
