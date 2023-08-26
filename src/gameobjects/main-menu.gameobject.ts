import { BUTTON_PACK, ButtonPack } from "@patturn/assetpacks";
import { GameObject, IGameObject, Scene } from "@patturn/engine";
import { drawMenuRect } from "./menu-rect";
import { Preferences } from "@capacitor/preferences";

export enum MENU_EVENTS {
  MainMenu = "mainMenu",
  Settings = "settings",
  InGame = "ingame",
  Ads = "ads",
  GameOver = "gameover",
}

@GameObject()
export class MainMenuGameObject implements IGameObject {
  container: Phaser.GameObjects.Container;
  events: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  menuRectangle: Phaser.GameObjects.Rectangle;
  PlayButton: Phaser.GameObjects.Image;
  SettingsButton: Phaser.GameObjects.Image;
  BackButton: Phaser.GameObjects.Image;
  HomeButton: Phaser.GameObjects.Image;
  ContinueButton: Phaser.GameObjects.Image;
  RestartButton: Phaser.GameObjects.Image;
  private Depth = 9;

  constructor(public scene: Scene) {}

  preload() {}

  create() {
    this.container = this.scene.add.container(0, 0).setDepth(this.Depth);
    this.drawButtons();
    this.drawMenuScreen("Patturn");
    this.PlayButton.setVisible(true);
    this.container.add(this.PlayButton);
    this.drawHighScoreText();
  }

  drawHighScoreText() {
    Preferences.get({ key: "highscore" }).then((result) => {
      if (result.value === null) {
        Preferences.set({ key: "highscore", value: "0" });
        result.value = "0";
      }

      // add highscore text
      const highScoreText = this.scene.add.text(0, 0, "High Score", {
        fontSize: "32px",
        color: "#000",
      });
      const highScoreTextGeom = highScoreText.getBounds();

      const highScoreValueText = this.scene.add.text(0, 0, result.value, {
        fontSize: "32px",
        color: "#000",
      });

      const highScoreValueTextGeom = highScoreValueText.getBounds();
      highScoreValueText.setPosition(
        this.scene.calculatePercentage(
          50,
          this.scene.gameWidth - highScoreValueTextGeom.width
        ),
        this.scene.calculatePercentage(15, this.scene.gameHeight)
      );

      this.container.add(highScoreValueText);

      highScoreText.setPosition(
        this.scene.calculatePercentage(
          50,
          this.scene.gameWidth - highScoreTextGeom.width
        ),
        this.scene.calculatePercentage(10, this.scene.gameHeight)
      );
      this.container.add(highScoreText);
    });
  }

  drawHeaderText(headerText: string, rectGeom: Phaser.Geom.Rectangle) {
    const menuText = this.scene.add.text(0, 0, headerText, {
      fontSize: "32px",
      color: "#000",
    });
    const menuTextGeom = menuText.getBounds();
    menuText.setPosition(
      rectGeom.centerX - this.scene.calculatePercentage(50, menuTextGeom.width),
      this.scene.calculatePercentage(30, rectGeom.height)
    );
    this.container.add(menuText);
  }

  drawMenuScreen(headerText: string) {
    this.menuRectangle = drawMenuRect(this.scene, 0xffffff, 0x000000).setDepth(
      this.Depth
    );
    this.container.add(this.menuRectangle);
    const rectGeom = this.menuRectangle.getBounds();
    this.drawHeaderText(headerText, rectGeom);
    this.container.setVisible(true);
  }

  hideMenuScreen() {
    this.container.setVisible(false);
  }

  drawButtons() {
    this.drawPlayButton();
    this.drawSettingsButton();
    this.drawHomeButton();
    this.drawBackButton();
    this.drawContinueButton();
    this.drawRestartButton();
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
      .setDepth(this.Depth)
      .on("pointerdown", () => {
        this.container.setVisible(false);
        this.SettingsButton.setVisible(true);
        this.HomeButton.setVisible(true);
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
      .setDepth(this.Depth)
      .setVisible(false)
      .on("pointerdown", () => {
        this.drawMenuScreen("Settings");
        this.SettingsButton.setVisible(false);
        this.BackButton.setVisible(true);
        this.HomeButton.setVisible(false);
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
      .setDepth(this.Depth)
      .setVisible(false)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.InGame);
        this.container.setVisible(false);
        this.BackButton.setVisible(false);
        this.SettingsButton.setVisible(true);
        this.HomeButton.setVisible(true);
      });

    this.BackButton = backbutton;
    return backbutton;
  }

  drawRestartButton() {
    const restartButton = this.scene.add
      .image(
        this.scene.screenCenterX,
        this.scene.screenCenterY,
        BUTTON_PACK.RestartButton
      )
      .setInteractive()
      .setDepth(this.Depth)
      .setScale(0.3)
      .setVisible(false)
      .on("pointerdown", () => {
        this.events.emit(MENU_EVENTS.InGame);
        // this.events.emit(MENU_EVENTS.Retry);
      });

    this.RestartButton = restartButton;
    return restartButton;
  }

  drawHomeButton() {
    const homeButton = this.scene.add
      .image(this.scene.gameWidth - 25, 25, BUTTON_PACK.HomeButton)
      .setInteractive()
      .setDepth(this.Depth)
      .setScale(0.2)
      .setVisible(false)
      .on("pointerdown", () => {
        // this.events.emit(MENU_EVENTS.Home);
      });
    this.HomeButton = homeButton;
    return homeButton;
  }

  drawContinueButton() {
    const continueButton = this.scene.add
      .image(
        this.scene.screenCenterX,
        this.scene.screenCenterY,
        BUTTON_PACK.PlayButton
      )
      .setInteractive()
      .setScale(0.3)
      .setVisible(false)
      .on("pointerdown", () => {
        // this.events.emit(MENU_EVENTS.Continue);
      });

    this.ContinueButton = continueButton;
    return continueButton;
  }

  drawSettingsScreen() {
    this.menuRectangle = drawMenuRect(this.scene, 0xffffff, 0x000000);
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
    this.container.setVisible(true);
  }

  update() {}
}
