import { MenuPack, MenuPackKeysEnum } from "@patturn/assetpacks";
import {
  GameObject,
  IGameObject,
  Scene,
  CalculatePercentage,
} from "@patturn/engine";

@GameObject()
export class MainMenuGameObject implements IGameObject {
  container: Phaser.GameObjects.Container;
  rect: Phaser.GameObjects.Rectangle;
  borderPadding: number = 20;
  eventEmitter: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();

  constructor(public gameScene: Scene) {}

  preload() {
    this.gameScene.AssetPackLoader(MenuPack);
  }

  create() {
    this.container = this.gameScene.add.container(0, 0);
    const rectWidth = this.gameScene.gameWidth - this.borderPadding * 2;
    const rectHeight = this.gameScene.gameHeight - this.borderPadding * 2;
    const rectPositionX = this.borderPadding;
    const rectPositionY = this.borderPadding;
    const borderRadius = 30;

    const rectGeom = new Phaser.Geom.Rectangle(
      rectPositionX,
      rectPositionY,
      rectWidth,
      rectHeight
    );

    this.rect = this.gameScene.add.rectangle(
      rectGeom.centerX,
      rectGeom.centerY,
      rectWidth,
      rectHeight,
      0x6666ff
    );
    this.rect.setStrokeStyle(4, 0x6666ff);
    this.rect.setInteractive();
    this.container.add(this.rect);
    this.container.setDepth(1);

    const menuText = this.gameScene.add.text(0, 0, "Patturn", {
      fontSize: "32px",
    });
    const menuTextGeom = menuText.getBounds();
    menuText.setPosition(
      rectGeom.centerX - CalculatePercentage(50, menuTextGeom.width),
      CalculatePercentage(30, rectGeom.height)
    );
    this.container.add(menuText);
    const PlayButton = this.gameScene.add
      .image(
        this.gameScene.screenCenterX,
        this.gameScene.screenCenterY,
        MenuPackKeysEnum.PlayButton
      )
      .setInteractive()
      .setScale(0.3)
      .on("pointerdown", () => {
        this.hide();
        this.eventEmitter.emit("play");
      });
    this.container.add(PlayButton);
  }

  update() {}

  show() {
    this.container.setAlpha(1);
  }

  hide() {
    this.container.setAlpha(0);
  }
}
