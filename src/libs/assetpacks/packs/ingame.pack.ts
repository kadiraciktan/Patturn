import { PackFileConfig } from "../pack-file.config";

export enum IngamePackKeysEnum {
  Heart = "Heart",
}

export const ingamepack: PackFileConfig[] = [
  {
    key: IngamePackKeysEnum.Heart,
    url: "gfx/heart.svg",
    type: "image",
  },
];
