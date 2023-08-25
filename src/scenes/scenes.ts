import { GameScene } from "./game.scene";
import { InGameScene } from "./ingame.scene";
import { MainMenuScene, SettingsScene } from "./menu";
import { SecondScene } from "./second.scene";

export enum ScenesEnum {
  MainMenuScene = "MainMenuScene",
  SettingsScene = "SettingsScene",
  InGameScene = "InGameScene",
}
export const Scenes = [GameScene,SecondScene];
