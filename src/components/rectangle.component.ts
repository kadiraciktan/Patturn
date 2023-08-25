import { Component } from "../decorators";

@Component()
export class RectangleComponent {
  
  constructor(public scene: Phaser.Scene) {}

  preload() {
    console.log("MyComponent's preload function");
  }

  create() {
    console.log("MyComponent's create function");
  }

}
