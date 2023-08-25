import Phaser from "phaser";
import { Scenes } from "./scenes";
import { ImageLoaderPlugin } from "./plugins";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
  },
  scene: [...Scenes],
  parent: "game",
  backgroundColor: "#FFFFFF",
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.ENVELOP,
  },
  autoMobilePipeline: true,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  loader: {
    baseURL: "src/assets/",
  },
};

const game = new Phaser.Game(config);
