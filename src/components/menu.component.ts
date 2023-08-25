import { MenuPackKeysEnum } from "@patturn/assetpacks";
import Phaser from "phaser";

export class MenuComponent {
  container: Phaser.GameObjects.Container;
  rect: Phaser.GameObjects.Rectangle;
  borderPadding: number = 20;
  gameWidth: number;
  gameHeight: number;

  menuButtons: {
    [key in MenuPackKeysEnum]?: Phaser.GameObjects.Image | null;
  };

  constructor(private scene: Phaser.Scene) {}

  preload() {

    // const addedPack = this.scene.load.addPack(menuPack);
    // console.log("addedPack", addedPack);
  }

  draw() {
    this.gameWidth = this.scene.game.config.width as number;
    this.gameHeight = this.scene.game.config.height as number;
    this.container = this.scene.add.container(0, 0);
    const rectWidth = this.gameWidth - this.borderPadding * 2;
    const rectHeight = this.gameHeight - this.borderPadding * 2;
    const rectPositionX = this.borderPadding;
    const rectPositionY = this.borderPadding;
    const borderRadius = 30;

    const rectGeom = new Phaser.Geom.Rectangle(
      rectPositionX,
      rectPositionY,
      rectWidth,
      rectHeight
    );

    this.rect = this.scene.add.rectangle(
      rectGeom.centerX,
      rectGeom.centerY,
      rectWidth,
      rectHeight,
      0x6666ff
    );
    this.rect.setStrokeStyle(4, 0x6666ff);
    this.rect.setInteractive();

    this.scene.add
      .graphics()
      .fillStyle(0x6666ff)
      .fillRoundedRect(
        rectGeom.x,
        rectGeom.y,
        rectGeom.width,
        rectGeom.height,
        borderRadius
      );
    this.container.add(this.rect);

    this.container.setDepth(1);

    const menuText = this.scene.add.text(0, 0, "Patturn", {
      fontSize: "32px",
    });
    const menuTextGeom = menuText.getBounds();
    menuText.setPosition(
      rectGeom.centerX - this.calculatePercentage(50, menuTextGeom.width),
      this.calculatePercentage(30, rectGeom.height)
    );
    this.container.add(menuText);
  }

  calculatePercentage(percentage: number, total: number) {
    return (percentage / 100) * total;
  }

  show() {
    this.container.setVisible(true);
  }

  hide() {
    this.container.setVisible(false);
  }
}
