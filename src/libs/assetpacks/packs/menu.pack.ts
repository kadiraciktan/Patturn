import { PackFileConfigModel } from "@patturn/engine";

export enum BUTTON_PACK {
  PlayButton = "playbutton",
  SettingsButton = "settingsbutton",
  BackButton = "backbutton",
  NextButton = "nextbutton",
  HomeButton = "homebutton",
  PauseButton = "pausebutton",
  RestartButton = "restartbutton",  
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
  {
    key: BUTTON_PACK.HomeButton,
    url: PackURL + "home.png",
    type: "image",
  },
  {
    key: BUTTON_PACK.PauseButton,
    url: PackURL + "pause.png",
    type: "image",
  },
  {
    key: BUTTON_PACK.RestartButton,
    url: PackURL + "return.png",
    type: "image",
  },

];
