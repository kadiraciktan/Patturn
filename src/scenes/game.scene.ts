import { IngamePack, ButtonPack } from "@patturn/assetpacks";
import { MOUSE_EVENTS, Scene, SceneDecorator } from "@patturn/engine";
import {
  MENU_EVENTS,
  MainMenuGameObject,
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
    this.mainMenu.events.on(MENU_EVENTS.Play, () => {
      this.mainMenu.menuState = MENU_EVENTS.Play;
      this.mainMenu.hide();
      this.mainMenu.drawSettingsButton();
    });

    this.mainMenu.events.on(MENU_EVENTS.Settings, () => {
      this.mainMenu.menuState = MENU_EVENTS.Settings;
      this.mainMenu.hide();
      this.mainMenu.drawSettingsScreen();
    });

    this.mainMenu.events.on(MENU_EVENTS.Back, () => {
      this.mainMenu.menuState = MENU_EVENTS.Play;
      this.mainMenu.hide();
    });

    this.spinWheel.show();
    this.spinWheel.events.on(MOUSE_EVENTS.CLICK, () => {
      this.spinWheel.currentSpeed += 1;
    });

    // this.mainMenu.eventEmitter.on(MenuStateEnum.Play, () => {
    //   this.spinWheel.draw();
    // });
  }
}
