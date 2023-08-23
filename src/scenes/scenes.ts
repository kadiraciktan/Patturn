import { InGameScene } from "./ingame.scene";
import { MainMenuScene, SettingsScene } from "./menu";

export enum ScenesEnum {
  MainMenuScene = "MainMenuScene",
  SettingsScene = "SettingsScene",
  InGameScene = "InGameScene",
}
export const Scenes = [MainMenuScene, SettingsScene, InGameScene];
