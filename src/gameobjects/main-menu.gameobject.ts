import { BUTTON_PACK, ButtonPack } from "@patturn/assetpacks";
import { GameObject, IGameObject, Scene } from "@patturn/engine";
import { drawMenuRect } from "./menu-rect";

export enum MENU_EVENTS {
  Play = "play",
  Settings = "settings",
  ADS = "ads",
  Retry = "retry",
  Back = "back",
}

@GameObject()
export class MainMenuGameObject implements IGameObject {
  private isActive: boolean = true;
  container: Phaser.GameObjects.Container;
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  menuRectangle: Phaser.GameObjects.Rectangle;
  menuState: MENU_EVENTS = MENU_EVENTS.Play;

  constructor(public scene: Scene) {}

  preload() {}

  create() {
    if (this.menuState === MENU_EVENTS.Play) {
      this.drawPlayScreen();
    }

    if (this.menuState === MENU_EVENTS.Settings) {
      this.drawSettingsScreen();
    }
  }

  drawPlayScreen() {
    this.container = this.scene.add.container(0, 0);
    this.menuRectangle = drawMenuRect(this.scene);
    this.container.add(this.menuRectangle);
    const rectGeom = this.menuRectangle.getBounds();
    const menuText = this.scene.add.text(0, 0, "Patturn", {
      fontSize: "32px",
    });
    const menuTextGeom = menuText.getBounds();
    menuText.setPosition(
      rectGeom.centerX - this.scene.calculatePercentage(50, menuTextGeom.width),
      this.scene.calculatePercentage(30, rectGeom.height)
    );
    this.container.add(menuText);
    const PlayButton = this.scene.add
      .image(
        this.scene.screenCenterX,
        this.scene.screenCenterY,
        BUTTON_PACK.PlayButton
      )
      .setInteractive()
      .setScale(0.3)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.Play);
      });

    this.container.add(PlayButton);
    this.container.setVisible(true);
  }

  drawSettingsButton() {
    return this.scene.add
      .image(25, 25, BUTTON_PACK.SettingsButton)
      .setInteractive()
      .setScale(0.2)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.Settings);
      });
  }

  drawBackButton() {
    return this.scene.add
      .image(25, 25, BUTTON_PACK.BackButton)
      .setInteractive()
      .setScale(0.2)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.Back);
      });
  }

  drawSettingsScreen() {
    this.container = this.scene.add.container(0, 0);
    this.menuRectangle = drawMenuRect(this.scene);
    this.container.add(this.menuRectangle);
    const rectGeom = this.menuRectangle.getBounds();
    const menuText = this.scene.add.text(0, 0, "Settings", {
      fontSize: "32px",
    });
    const menuTextGeom = menuText.getBounds();
    menuText.setPosition(
      rectGeom.centerX - this.scene.calculatePercentage(50, menuTextGeom.width),
      this.scene.calculatePercentage(30, rectGeom.height)
    );
    this.container.add(menuText);
    const BackButton = this.drawBackButton();
    this.container.add(BackButton);
    this.container.setVisible(true);
  }

  update() {}

  show() {
    this.isActive = true;
    this.container.setVisible(this.isActive);
  }

  hide() {
    this.isActive = false;
    this.container.setVisible(this.isActive);
  }
}
