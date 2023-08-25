import { IngamePack, ButtonPack } from "@patturn/assetpacks";
import { MOUSE_EVENTS, Scene, SceneDecorator } from "@patturn/engine";
import {
  MENU_EVENTS,
  MainMenuGameObject,
  MenuStateEnum,
  SpinWheelGameObject,
} from "src/gameobjects";

@SceneDecorator()
export class GameScene extends Scene {
  mainMenu = new MainMenuGameObject(this);
  spinWheel = new SpinWheelGameObject(this);
  score: number = 0;
  constructor() {
    super("TestScene");
  }
  preload() {
    this.AssetPackLoader(IngamePack);
    this.AssetPackLoader(ButtonPack);
  }
  create() {
    // draw Score Text

    const scoreText = this.add.text(0, 0, "Score: 0", {
      fontSize: "32px",
      color: "#000",
    }).setVisible(false);

    const menuTextGeom = scoreText.getBounds();
    scoreText.setPosition(
      this.screenCenterX - menuTextGeom.width / 2,
      menuTextGeom.height
    );

    this.mainMenu.events.on(MENU_EVENTS.InGame, () => {
      scoreText.setVisible(true);
      this.mainMenu.menuState = MenuStateEnum.InGame;
      this.spinWheel.isActive = true;
      this.mainMenu.hide();
      this.mainMenu.PlayButton.setVisible(false);
      this.mainMenu.SettingsButton.setVisible(true);
      this.mainMenu.HomeButton.setVisible(true);
      this.mainMenu.RestartButton.setVisible(false);
    });

    this.mainMenu.events.on(MENU_EVENTS.Settings, () => {
      scoreText.setVisible(false);
      this.mainMenu.menuState = MenuStateEnum.Settings;
      this.spinWheel.isActive = false;
      this.mainMenu.hide();
      this.mainMenu.drawSettingsScreen();
      this.mainMenu.PlayButton.setVisible(false);
      this.mainMenu.SettingsButton.setVisible(false);
      this.mainMenu.BackButton.setVisible(true);
      this.mainMenu.HomeButton.setVisible(false);
      this.mainMenu.RestartButton.setVisible(false);
    });

    this.mainMenu.events.on(MENU_EVENTS.Home, () => {
      scoreText.setVisible(false);
      this.mainMenu.menuState = MenuStateEnum.Home;
      this.mainMenu.show();
      this.mainMenu.drawPlayScreen();
      this.mainMenu.PlayButton.setVisible(true);
      this.mainMenu.HomeButton.setVisible(false);
      this.mainMenu.BackButton.setVisible(false);
      this.mainMenu.SettingsButton.setVisible(false);
      this.spinWheel.isActive = false;
      this.mainMenu.PlayButton.x = this.screenCenterX - 30;
      this.mainMenu.RestartButton.x = this.screenCenterX + 35;
      this.mainMenu.RestartButton.setVisible(true);
    });

    this.mainMenu.events.on(MENU_EVENTS.Retry, () => {
      this.mainMenu.menuState = MenuStateEnum.InGame;
      this.mainMenu.hide();
      this.mainMenu.PlayButton.setVisible(false);
      this.mainMenu.SettingsButton.setVisible(true);
      this.mainMenu.HomeButton.setVisible(true);
      this.mainMenu.RestartButton.setVisible(false);
      this.spinWheel.isActive = true;
      this.score = 0;
      scoreText.setText(`Score: ${this.score}`);
      this.spinWheel.currentSpeed = 1;
      scoreText.setVisible(true);
    });

    this.spinWheel.show();
    this.spinWheel.events.on(MOUSE_EVENTS.CLICK, () => {
      this.spinWheel.currentSpeed += 1;
      this.score += 1;
      scoreText.setText(`Score: ${this.score}`);
    });
  }
}
