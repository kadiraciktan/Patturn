import { PackFileConfig } from "../pack-file.config";

export enum MenuPackKeysEnum {
  PlayButton = "playbutton",
  SettingsButton = "settingsbutton",
  BackButton = "backbutton",
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
];
