import { Scene } from "../class";

export interface IGameObject {
  gameScene: Scene;
  preload();
  create();
  update();
}
