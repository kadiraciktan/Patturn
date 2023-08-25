import { MenuPackKeysEnum, MenuPack } from "@patturn/assetpacks";
import { GameObject, IGameObject, Scene } from "@patturn/engine";

@GameObject()
export class RectangleComponent implements IGameObject {
  constructor(public scene: Scene) {}

  preload() {
    this.scene.AssetPackLoader(MenuPack);
  }

  create() {
    const playButton = this.scene.add
      .image(100, 100, MenuPackKeysEnum.PlayButton)
      .setScale(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.scene.start("SecondScene");
      });
  }

  update() {}
}
