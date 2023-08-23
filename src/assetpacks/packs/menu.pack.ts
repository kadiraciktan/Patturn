import { PackFileConfig } from "../pack-file.config";

export enum MenuPackKeysEnum {
  PlayButton = "playbutton",
  SettingsButton = "settingsbutton",
  BackButton = "backbutton",
  NextButton = "nextbutton",
  SmokeMusic = "smokemusic",
  Heart = "heart",
}

const PackURL = "src/assets/menus/square/";

export const menuPack: PackFileConfig[] = [
  {
    key: MenuPackKeysEnum.PlayButton,
    url: PackURL + "play.png",
    type: "image",
  },
  {
    key: MenuPackKeysEnum.SettingsButton,
    url: PackURL + "settings.png",
    type: "image",
  },
  {
    key: MenuPackKeysEnum.BackButton,
    url: PackURL + "back.png",
    type: "image",
  },
  {
    key: MenuPackKeysEnum.NextButton,
    url: PackURL + "next.png",
    type: "image",
  },
  {
    key: MenuPackKeysEnum.SmokeMusic,
    url: "src/assets/sfx/smoke.mp3",
    type: "audio",
  },
];
