import { PackFileConfigModel } from "@patturn/engine";

export enum MenuPackKeysEnum {
  PlayButton = "playbutton",
  SettingsButton = "settingsbutton",
  BackButton = "backbutton",
  NextButton = "nextbutton",
}
const PackURL = "menus/square/";

export const MenuPack: PackFileConfigModel[] = [
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
];
