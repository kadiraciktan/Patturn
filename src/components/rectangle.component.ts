import { GameObject, IGameObject } from "@patturn/lib";

@GameObject()
export class RectangleComponent implements IGameObject {
  constructor(public scene: Phaser.Scene) {}
  update() {}

  preload() {}

  create() {}
}
