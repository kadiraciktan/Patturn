import { PackFileConfigModel } from "@patturn/engine";

export enum IngamePackKeysEnum {
  YinYangWheel = "yinyangwheel",
}
const PackURL = "gfx/";

export const IngamePack: PackFileConfigModel[] = [
  {
    key: IngamePackKeysEnum.YinYangWheel,
    url: PackURL + "yinyang.svg",
    type: "image",
  },
];
