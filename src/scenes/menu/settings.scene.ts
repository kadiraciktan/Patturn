import { ScenesEnum } from "../scenes";
import { MenuPackKeysEnum, menuPack } from "../../assetpacks";
import Phaser from "phaser";
import { Scene } from "../Scene";
import { MenuFontStyle } from "./menu.constants";

export class SettingsScene extends Scene {
  menuButtons: {
    [key in MenuPackKeysEnum]?: Phaser.GameObjects.Image | null;
  };

  constructor() {
    super(ScenesEnum.SettingsScene);
  }

  preload() {
    this.AssetPackLoader(menuPack);
    this.LoadProps();
  }

  create() {
    this.backgroundSound = this.sound.add(MenuPackKeysEnum.SmokeMusic);
    this.createButtons();
    const menuText = this.uiManager.addText(
      "Settings",
      this.screenCenterX - 100,
      this.screenCenterY - 120,
      MenuFontStyle
    );
    menuText.setScale(0.5);

    this.createMusicButton();

    this.createEffectsButton();
  }

  createMusicButton() {
    const BUTTON_SPACING = 70;
    const BUTTON_Y = this.screenCenterY;
    const BUTTON_X = this.screenCenterX;

    let currentMusicVolume = localStorage.getItem("musicVolume")
      ? parseFloat(localStorage.getItem("musicVolume")!)
      : 1;

    this.backgroundSound.manager.volume = currentMusicVolume;

    const musicText = this.uiManager.addText(
      "Music",
      BUTTON_X - 35,
      BUTTON_Y - 55,
      MenuFontStyle
    );
    musicText.setScale(0.3);

    const musicValueText = this.uiManager.addText(
      currentMusicVolume.toFixed(1).toString(),
      BUTTON_X - 25,
      BUTTON_Y - 10,
      MenuFontStyle
    );
    musicValueText.setScale(0.3);

    this.add
      .image(BUTTON_X - BUTTON_SPACING, BUTTON_Y, MenuPackKeysEnum.BackButton)
      .setInteractive()
      .setScale(0.2)
      .on("pointerdown", () => {
        this.data.set("musicVolume", currentMusicVolume);
        const newVolume = currentMusicVolume - 0.1;
        if (newVolume >= 0.0) {
          currentMusicVolume = newVolume;
          musicValueText.setText(currentMusicVolume.toFixed(1).toString());
          localStorage.setItem("musicVolume", currentMusicVolume.toString());
          this.backgroundSound.manager.volume = currentMusicVolume;
        }
      });

    this.add
      .image(BUTTON_X + BUTTON_SPACING, BUTTON_Y, MenuPackKeysEnum.NextButton)
      .setInteractive()
      .setScale(0.2)
      .on("pointerdown", () => {
        this.data.set("musicVolume", currentMusicVolume);
        const newVolume = currentMusicVolume + 0.1;
        if (newVolume <= 1) {
          currentMusicVolume = newVolume;
          musicValueText.setText(currentMusicVolume.toFixed(1).toString());
          localStorage.setItem("musicVolume", currentMusicVolume.toString());
          this.backgroundSound.manager.volume = currentMusicVolume;
        }
      });

    this.menuButtons[MenuPackKeysEnum.BackButton]?.on("pointerdown", () => {
      this.scene.start(ScenesEnum.MainMenuScene);
    });
  }

  createEffectsButton() {
    const BUTTON_SPACING = 70;
    const BUTTON_Y = this.screenCenterY + 100;
    const BUTTON_X = this.screenCenterX;

    let currentEffectsVolume = localStorage.getItem("effectsVolume")
      ? parseFloat(localStorage.getItem("effectsVolume")!)
      : 1;

    this.data.set("effectsVolume", currentEffectsVolume);

    const effectsText = this.uiManager.addText(
      "Effects",
      BUTTON_X - 55,
      BUTTON_Y - 55,
      MenuFontStyle
    );
    effectsText.setScale(0.3);

    const effectsValueText = this.uiManager.addText(
      currentEffectsVolume.toFixed(1).toString(),
      BUTTON_X - 25,
      BUTTON_Y - 10,
      MenuFontStyle
    );

    effectsValueText.setScale(0.3);

    this.add
      .image(BUTTON_X - BUTTON_SPACING, BUTTON_Y, MenuPackKeysEnum.BackButton)
      .setInteractive()
      .setScale(0.2)
      .on("pointerdown", () => {
        this.data.set("effectsVolume", currentEffectsVolume);
        const newVolume = currentEffectsVolume - 0.1;
        if (newVolume >= 0.0) {
          currentEffectsVolume = newVolume;
          effectsValueText.setText(currentEffectsVolume.toFixed(1).toString());
          localStorage.setItem(
            "effectsVolume",
            currentEffectsVolume.toString()
          );
        }
      });

    this.add
      .image(BUTTON_X + BUTTON_SPACING, BUTTON_Y, MenuPackKeysEnum.NextButton)
      .setInteractive()
      .setScale(0.2)
      .on("pointerdown", () => {
        this.data.set("effectsVolume", currentEffectsVolume);
        const newVolume = currentEffectsVolume + 0.1;
        if (newVolume <= 1) {
          currentEffectsVolume = newVolume;
          effectsValueText.setText(currentEffectsVolume.toFixed(1).toString());
          localStorage.setItem(
            "effectsVolume",
            currentEffectsVolume.toString()
          );
        }
      });
  }

  createButtons() {
    const BackButton = this.add
      .image(25, 25, MenuPackKeysEnum.BackButton)
      .setScale(0.2)
      .setInteractive();
    this.menuButtons = {
      ...this.menuButtons,
      [MenuPackKeysEnum.BackButton]: BackButton,
    };
  }
}
