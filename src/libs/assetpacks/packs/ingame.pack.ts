import { PackFileConfigModel } from "@patturn/engine";

export enum IngamePackKeysEnum {
  YinYangWheel = "yinyangwheel",
  WhiteCircle = "whitecircle",
  Background1 = "background1",
  Background2 = "background2",
  Background3 = "background3",
  Background4 = "background4",
}
const PackURL = "gfx/";

export const IngamePack: PackFileConfigModel[] = [
  {
    key: IngamePackKeysEnum.WhiteCircle,
    url: PackURL + "whitecircle.svg",
    type: "image",
  },
  {
    key: IngamePackKeysEnum.YinYangWheel,
    url: PackURL + "yinyang.svg",
    type: "image",
  },
  {
    key: IngamePackKeysEnum.Background1,
    url: PackURL + "bg_1.jpg",
    type: "image",
  },
  {
    key: IngamePackKeysEnum.Background2,
    url: PackURL + "bg_2.jpg",
    type: "image",
  },
  {
    key: IngamePackKeysEnum.Background3,
    url: PackURL + "bg_3.jpg",
    type: "image",
  },
  {
    key: IngamePackKeysEnum.Background4,
    url: PackURL + "bg_4.jpg",
    type: "image",
  },
];
