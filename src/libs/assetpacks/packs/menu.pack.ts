import { PackFileConfigModel } from "@patturn/engine";

export enum BUTTON_PACK {
  PlayButton = "playbutton",
  SettingsButton = "settingsbutton",
  BackButton = "backbutton",
  NextButton = "nextbutton",
}
const PackURL = "menus/square/";

export const ButtonPack: PackFileConfigModel[] = [
  {
    key: BUTTON_PACK.PlayButton,
    url: PackURL + "play.png",
    type: "image",
  },
  {
    key: BUTTON_PACK.SettingsButton,
    url: PackURL + "settings.png",
    type: "image",
  },
  {
    key: BUTTON_PACK.BackButton,
    url: PackURL + "back.png",
    type: "image",
  },
  {
    key: BUTTON_PACK.NextButton,
    url: PackURL + "next.png",
    type: "image",
  },
];
