import { ScenesEnum } from "../scenes";
import { MenuPackKeysEnum, menuPack } from "../../assetpacks";
import Phaser from "phaser";
import { Scene } from "../Scene";
import { MenuFontStyle } from "./menu.constants";

export class MainMenuScene extends Scene {
  menuButtons: {
    [key in MenuPackKeysEnum]?: Phaser.GameObjects.Image | null;
  };

  constructor() {
    super(ScenesEnum.MainMenuScene);
  }

  preload() {
    this.AssetPackLoader(menuPack);
    this.LoadProps();
  }

  create() {
    this.scale.on("orientationchange", (orientation) => {
      if (orientation.includes("portrait")) {
        this.scale.setGameSize(this.gameWidth, this.gameHeight);
      } else {
        this.scale.setGameSize(this.gameHeight, this.gameWidth);
      }
    });

    if (!this.backgroundSound) {
      this.backgroundSound = this.sound.add(MenuPackKeysEnum.SmokeMusic);
    }
    if (!this.backgroundSound.isPlaying) {
      this.backgroundSound.play();
    }

    const currentVolume = parseFloat(localStorage.getItem("musicVolume")!) || 1;
    this.backgroundSound.manager.volume = currentVolume;
    this.createButtons();
    this.menuButtons[MenuPackKeysEnum.PlayButton]?.on("pointerdown", () => {
      this.scene.start(ScenesEnum.InGameScene);
    });
    this.menuButtons[MenuPackKeysEnum.SettingsButton]?.on("pointerdown", () => {
      this.scene.start(ScenesEnum.SettingsScene);
    });
    const menuText = this.uiManager.addText(
      "Patturn",
      this.screenCenterX - 90,
      this.screenCenterY - 120,
      MenuFontStyle
    );
    menuText.setScale(0.5);
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
