import { Scene } from "../class";

export interface IGameObject {
  scene: Scene;
  preload();
  create();
  update();
}
