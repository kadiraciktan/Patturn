import Phaser from "phaser";
import { RectangleComponent } from "../components/rectangle.component";

export class TestScene extends Phaser.Scene {
  rectangleComponent: RectangleComponent = new RectangleComponent(this);
  menuContainer: Phaser.GameObjects.Container;
  constructor() {
    super("TestScene");
  }
  preload() {
    this.load.image("logo", "yinyang.svg");
    console.log("TestScene Preload");
  }
  create() {
    this.add.image(400, 300, "logo");
    console.log("TestScene Create");
  }
}
