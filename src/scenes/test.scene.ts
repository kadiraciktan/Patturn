import Phaser from "phaser";
import { Scene } from "@patturn/engine";
import { RectangleComponent } from "../components";

export class TestScene extends Scene {
  rectangleComponent: RectangleComponent = new RectangleComponent(this);
  menuContainer: Phaser.GameObjects.Container;
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
