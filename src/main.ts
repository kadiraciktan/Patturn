import Phaser from "phaser";
import { Scene } from "./scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
  },
  scene: [Scene],
  parent: "game",
  backgroundColor: "#0000FF",
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.ENVELOP
  },
  autoMobilePipeline: true,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  
};

const game = new Phaser.Game(config);
