import { InGameScene } from "./ingame.scene";
import { MainMenuScene } from "./main-menu.scene";
import { SettingsScene } from "./settings.scene";

export enum ScenesEnum {
  MainMenuScene = "MainMenuScene",
  SettingsScene = "SettingsScene",
  InGameScene = "InGameScene",
}
export const Scenes = [MainMenuScene, InGameScene, SettingsScene];
