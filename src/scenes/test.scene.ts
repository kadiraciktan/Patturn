import Phaser from "phaser";
import { RectangleComponent } from "../components/rectangle.component";

export class TestScene extends Phaser.Scene {
  rectangleComponent: RectangleComponent = new RectangleComponent(this);
  menuContainer: Phaser.GameObjects.Container;
  constructor() {
    super("TestScene");
  }
  preload() {
    console.log("TestScene Preload");
  }
  create() {
    console.log("TestScene Create");
  }
}
