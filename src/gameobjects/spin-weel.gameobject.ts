import { GameObject, IGameObject, Scene } from "@patturn/engine";

@GameObject()
export class SpinWheelGameObject implements IGameObject {
  constructor(public gameScene: Scene) {}
  preload() {}
  create() {}
  update() {}
}
