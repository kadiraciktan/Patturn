import { ScenesEnum } from "./scenes";
import { MenuPackKeysEnum, menuPack } from "../assetpacks";
import Phaser from "phaser";
import { UIManager } from "../ui.manager";
import { Scene } from "./Scene";

export class MainMenuScene extends Scene {
  menuButtons: {
    [key in MenuPackKeysEnum]?: Phaser.GameObjects.Image | null;
  };
  uiManager: UIManager = new UIManager(this);

  constructor() {
    super(ScenesEnum.MainMenuScene);
  }

  preload() {
    this.LoadProps();
    this.AssetPackLoader(menuPack);
  }

  create() {
    this.createButtons();
    this.menuButtons[MenuPackKeysEnum.PlayButton]?.on("pointerdown", () => {
      this.scene.start(ScenesEnum.InGameScene);
    });
    this.menuButtons[MenuPackKeysEnum.SettingsButton]?.on("pointerdown", () => {
      this.scene.start(ScenesEnum.SettingsScene);
    });

    this.uiManager.addText(
      "Patturn",
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
    const PlayButton = this.add
      .image(
        this.screenCenterX,
        this.screenCenterY,
        MenuPackKeysEnum.PlayButton
      )
      .setScale(0.3)
      .setInteractive();

    const SettingsButton = this.add
      .image(this.gameWidth - 25, 25, MenuPackKeysEnum.SettingsButton)
      .setScale(0.2)
      .setInteractive();

    this.menuButtons = {
      [MenuPackKeysEnum.PlayButton]: PlayButton,
      [MenuPackKeysEnum.SettingsButton]: SettingsButton,
    };
  }

  update() {}
}
