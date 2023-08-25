export interface IGameObject {
  scene: Phaser.Scene;
  preload();
  create();
  update();
}
