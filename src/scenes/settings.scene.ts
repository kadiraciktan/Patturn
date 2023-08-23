import { ScenesEnum } from "./scenes";
import { MenuPackKeysEnum, menuPack } from "../assetpacks";
import Phaser from "phaser";
import { UIManager } from "../ui.manager";
import { Scene } from "./Scene";

export class SettingsScene extends Scene {
  menuButtons: {
    [key in MenuPackKeysEnum]?: Phaser.GameObjects.Image | null;
  };
  uiManager: UIManager = new UIManager(this);

  constructor() {
    super(ScenesEnum.SettingsScene);
  }

  preload() {
    this.LoadProps();
    this.AssetPackLoader(menuPack);
  }

  create() {
    this.createButtons();
    this.menuButtons[MenuPackKeysEnum.BackButton]?.on("pointerdown", () => {
      this.scene.start(ScenesEnum.MainMenuScene);
    });

    this.uiManager.addText(
      "Settings",
      this.screenCenterX - 190,
      this.screenCenterY - 190,
      {
        fontSize: "90px",
        color: "#000000",
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 2,
          offsetY: 2,
          blur: 8,
        },
        stroke: "#FFFFFF",
        align: "center",
      }
    );
  }

  createButtons() {
    const BackButton = this.add
      .image(25, 25, MenuPackKeysEnum.BackButton)
      .setScale(0.2)
      .setInteractive();
    this.menuButtons = {
      [MenuPackKeysEnum.BackButton]: BackButton,
    };
  }

  update() {}
}
