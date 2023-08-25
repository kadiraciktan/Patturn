import { BUTTON_PACK, ButtonPack } from "@patturn/assetpacks";
import { GameObject, IGameObject, Scene } from "@patturn/engine";
import { drawMenuRect } from "./menu-rect";

export enum MENU_EVENTS {
  Play = "play",
  Settings = "settings",
  ADS = "ads",
  Retry = "retry",
  Back = "back",
  Home = "home",
  InGame = "ingame",
}

export enum MenuStateEnum {
  Play = "play",
  Settings = "settings",
  InGame = "ingame",
}

@GameObject()
export class MainMenuGameObject implements IGameObject {
  private isActive: boolean = true;
  container: Phaser.GameObjects.Container;
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  menuRectangle: Phaser.GameObjects.Rectangle;
  menuState: MenuStateEnum = MenuStateEnum.Play;
  PlayButton: Phaser.GameObjects.Image;
  SettingsButton: Phaser.GameObjects.Image;
  BackButton: Phaser.GameObjects.Image;
  HomeButton: Phaser.GameObjects.Image;

  constructor(public scene: Scene) {}

  preload() {}

  create() {
    if (this.menuState === MenuStateEnum.Play) {
      this.drawPlayScreen();
      this.drawPlayButton();
      this.drawSettingsButton();
      this.drawHomeButton();
      this.drawBackButton();
      this.PlayButton.setVisible(true);
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
    this.container.setVisible(true);
  }

  drawPlayButton() {
    const playButton = this.scene.add
      .image(
        this.scene.screenCenterX,
        this.scene.screenCenterY,
        BUTTON_PACK.PlayButton
      )
      .setInteractive()
      .setScale(0.3)
      .setVisible(false)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.InGame);
      });

    this.PlayButton = playButton;
    return playButton;
  }

  drawSettingsButton() {
    const settingsButton = this.scene.add
      .image(25, 25, BUTTON_PACK.SettingsButton)
      .setInteractive()
      .setScale(0.2)
      .setVisible(false)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.Settings);
      });

    this.SettingsButton = settingsButton;
    return settingsButton;
  }

  drawBackButton() {
    const backbutton = this.scene.add
      .image(25, 25, BUTTON_PACK.BackButton)
      .setInteractive()
      .setScale(0.2)
      .setVisible(false)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.InGame);
      });

    this.BackButton = backbutton;
    return backbutton;
  }

  drawHomeButton() {
    const homeButton = this.scene.add
      .image(this.scene.gameWidth - 25, 25, BUTTON_PACK.HomeButton)
      .setInteractive()
      .setScale(0.2)
      .setVisible(false)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.Home);
      });
    this.HomeButton = homeButton;
    return homeButton;
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
    this.BackButton = this.drawBackButton();
    this.container.add(this.BackButton);
    this.container.setVisible(true);
  }

  update() {}

  show() {
    this.container.setVisible(true);
  }

  hide() {
    this.container.setVisible(false);
  }
}
