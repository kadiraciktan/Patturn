import { MenuPackKeysEnum, MenuPack } from "@patturn/assetpacks";
import { GameObject, IGameObject, Scene } from "@patturn/engine";

@GameObject()
export class RectangleComponent implements IGameObject {
  constructor(public scene: Scene) {}

  preload() {
    console.log("preload", this.scene);
    this.scene.AssetPackLoader(MenuPack);
  }

  create() {
    const playButton = this.scene.add.image(
      100,
      100,
      MenuPackKeysEnum.PlayButton
    );
  }

  update() {}
}
