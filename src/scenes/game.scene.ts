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
  constructor() {
    super("TestScene");
  }
  preload() {
    this.AssetPackLoader(IngamePack);
    this.AssetPackLoader(ButtonPack);
  }
  create() {
    this.mainMenu.events.on(MENU_EVENTS.InGame, () => {
      this.mainMenu.hide();
      this.mainMenu.PlayButton.setVisible(false);
      this.mainMenu.SettingsButton.setVisible(true);
      this.mainMenu.HomeButton.setVisible(true);
    });

    this.mainMenu.events.on(MENU_EVENTS.Settings, () => {
      this.mainMenu.hide();
      this.mainMenu.drawSettingsScreen();
      this.mainMenu.PlayButton.setVisible(false);
      this.mainMenu.SettingsButton.setVisible(false);
      this.mainMenu.BackButton.setVisible(true);
      this.mainMenu.HomeButton.setVisible(false);
    });

    this.mainMenu.events.on(MENU_EVENTS.Home, () => {
      console.log("Home");
      this.mainMenu.show();
      this.mainMenu.drawPlayScreen();
      this.mainMenu.PlayButton.setVisible(true);
      this.mainMenu.HomeButton.setVisible(false);
      this.mainMenu.BackButton.setVisible(false);
      this.mainMenu.SettingsButton.setVisible(false);
    });

    this.spinWheel.show();
    this.spinWheel.events.on(MOUSE_EVENTS.CLICK, () => {
      this.spinWheel.currentSpeed += 1;
    });
  }
}
