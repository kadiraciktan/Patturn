import { Scene, SceneDecorator } from "@patturn/engine";
import { MainMenuGameObject } from "src/gameobjects";

@SceneDecorator()
export class GameScene extends Scene {
  mainMenu = new MainMenuGameObject(this);
  constructor() {
    super("TestScene");
  }
  preload() {
    this.load.image("logo", "yinyang.svg");
  }
  create() {
    this.add.image(400, 300, "logo");
  }
}
