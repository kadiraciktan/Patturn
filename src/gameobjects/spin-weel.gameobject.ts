import { IngamePack, IngamePackKeysEnum } from "@patturn/assetpacks";
import { GameObject, IGameObject, MOUSE_EVENTS, Scene } from "@patturn/engine";

@GameObject()
export class SpinWheelGameObject implements IGameObject {
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  gameObject: Phaser.GameObjects.Image;
  isActive: boolean = false;
  currentSpeed: number = 1;
  container: Phaser.GameObjects.Container;
  whiteCircle: Phaser.GameObjects.Image;
  blackCircle: Phaser.GameObjects.Image;

  constructor(public scene: Scene) {}

  preload() {
    this.scene.AssetPackLoader(IngamePack);
  }

  create() {
    this.container = this.scene.add.container(
      this.scene.calculatePercentage(50, this.scene.gameWidth),
      this.scene.calculatePercentage(50, this.scene.gameHeight)
    );
    var firstCircleAngle = Phaser.Math.Between(0, 360);
    var radius = 75;

    var secondCircleAngle = firstCircleAngle + 180;
    if (secondCircleAngle >= 360) {
      secondCircleAngle -= 360;
    }

    // İlk dairenin konumu
    var firstCircleX =
      this.container.x + radius * Math.cos((firstCircleAngle * Math.PI) / 180);
    var firstCircleY =
      this.container.y + radius * Math.sin((firstCircleAngle * Math.PI) / 180);

    // İkinci dairenin konumu
    var secondCircleX =
      this.container.x + radius * Math.cos((secondCircleAngle * Math.PI) / 180);
    var secondCircleY =
      this.container.y + radius * Math.sin((secondCircleAngle * Math.PI) / 180);

    const whiteTriggerCircle = this.scene.add
      .image(-5, 75, IngamePackKeysEnum.WhiteCircle)
      .setScale(0.3)
      .setAlpha(0.1);
    this.container.add(whiteTriggerCircle);

    const blackTriggerCircle = this.scene.add
      .image(-5, -75, IngamePackKeysEnum.WhiteCircle)
      .setScale(0.3)
      .setTint(0x000000)
      .setAlpha(0.2);
    this.container.add(blackTriggerCircle);
    this.container.setDepth(4);

    this.whiteCircle = this.scene.add
      .image(firstCircleX, firstCircleY, IngamePackKeysEnum.WhiteCircle)
      .setDepth(3)
      .setTint(0xffffff)
      .setScale(0.3);

    this.blackCircle = this.scene.add
      .image(secondCircleX, secondCircleY, IngamePackKeysEnum.WhiteCircle)
      .setDepth(3)
      .setScale(0.3)
      .setTint(0x000000);

    this.gameObject = this.scene.add
      .image(0, 0, IngamePackKeysEnum.YinYangWheel)
      .setDepth(4)
      .setScale(0.3)
      .setInteractive()
      .setVisible(this.isActive)
      .on("pointerdown", () => {
        const whiteTriggerCircleGeom = whiteTriggerCircle.getBounds();
        const triggerWhiteCircleX =
          whiteTriggerCircleGeom.x + whiteTriggerCircleGeom.width / 2;
        const triggerWhiteCircleY =
          whiteTriggerCircleGeom.y + whiteTriggerCircleGeom.height / 2;

        const distance = Phaser.Math.Distance.Between(
          triggerWhiteCircleX,
          triggerWhiteCircleY,
          this.whiteCircle.x,
          this.whiteCircle.y
        );

        if (distance < 15) {
          this.events.emit(MOUSE_EVENTS.TRUE_CLICK);
          this.reCalculateCircles();
        } else {
          this.events.emit(MOUSE_EVENTS.FALSE_CLICK);
        }
      });

    this.container.add(this.gameObject);
  }

  reCalculateCircles() {
    var firstCircleAngle = Phaser.Math.Between(0, 360);
    var radius = 75;

    var secondCircleAngle = firstCircleAngle + 180;
    if (secondCircleAngle >= 360) {
      secondCircleAngle -= 360;
    }

    // İlk dairenin konumu
    var firstCircleX =
      this.container.x + radius * Math.cos((firstCircleAngle * Math.PI) / 180);
    var firstCircleY =
      this.container.y + radius * Math.sin((firstCircleAngle * Math.PI) / 180);

    // İkinci dairenin konumu
    var secondCircleX =
      this.container.x + radius * Math.cos((secondCircleAngle * Math.PI) / 180);
    var secondCircleY =
      this.container.y + radius * Math.sin((secondCircleAngle * Math.PI) / 180);

    this.whiteCircle.setPosition(firstCircleX, firstCircleY);
    this.blackCircle.setPosition(secondCircleX, secondCircleY);
  }

  update() {
    if (!this.isActive) return;
    this.container.angle += this.currentSpeed;
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
