import {
  IngamePack,
  ButtonPack,
  IngamePackKeysEnum,
} from "@patturn/assetpacks";
import { MOUSE_EVENTS, Scene, SceneDecorator } from "@patturn/engine";
import {
  MENU_EVENTS,
  MainMenuGameObject,
  SpinWheelGameObject,
} from "src/gameobjects";

import { Preferences } from "@capacitor/preferences";

@SceneDecorator()
export class GameScene extends Scene {
  mainMenu = new MainMenuGameObject(this);
  spinWheel = new SpinWheelGameObject(this);
  score: number = 0;
  currentLives: number = 5;

  constructor() {
    super("TestScene");
  }
  preload() {
    this.AssetPackLoader(IngamePack);
    this.AssetPackLoader(ButtonPack);
  }
  create() {
    const bg = this.add.image(0, 0, IngamePackKeysEnum.Background3);
    bg.setOrigin(0, 0);

    const bgGeom = bg.getBounds();
    bg.setPosition(
      this.screenCenterX - bgGeom.width / 2,
      this.screenCenterY - bgGeom.height / 2
    );

    // cover black alpha 0.5
    const cover = this.add.rectangle(
      0,
      0,
      this.gameWidth,
      this.gameHeight,
      0x000000,
      0.4
    );
    cover.setOrigin(0, 0);
    cover.setDepth(0);

    const scoreText = this.add.text(0, 10, this.score.toString(), {
      fontSize: "32px",
      color: "#fff",
      fontStyle: "bold",
      backgroundColor: "#000",
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      },
    });

    const menuTextGeom = scoreText.getBounds();
    scoreText.setPosition(this.screenCenterX - menuTextGeom.width / 2, 10);
    scoreText.setVisible(false);

    Preferences.remove({ key: "score" });

    Preferences.get({ key: "score" }).then((result) => {
      if (result.value) {
        this.score = parseInt(result.value);
        scoreText.setText(`${this.score}`);
        const scoreTextGeom = scoreText.getBounds();
        scoreText.setPosition(this.screenCenterX - scoreTextGeom.width / 2, 10);
      }
    });

    this.mainMenu.events.on(MENU_EVENTS.InGame, () => {
      scoreText.setVisible(true);
      this.spinWheel.isActive = true;
    });

    this.mainMenu.events.on(MENU_EVENTS.Settings, () => {
      scoreText.setVisible(false);
      this.spinWheel.isActive = false;
    });

    this.mainMenu.events.on(MENU_EVENTS.MainMenu, () => {
      scoreText.setVisible(false);
      this.spinWheel.isActive = false;
    });

    this.mainMenu.events.on(MENU_EVENTS.GameOver, () => {
      Preferences.set({ key: "highscore", value: this.score.toString() });
    });

    this.spinWheel.show();
    this.spinWheel.events.on(MOUSE_EVENTS.TRUE_CLICK, () => {
      this.score += 1;
      let speed = 0.5;
      let increaseLevel = 1;
      if (this.score > 3) {
        increaseLevel /= 2;
      }
      speed = increaseLevel;
      this.spinWheel.currentSpeed += speed;
      scoreText.setText(`${this.score}`);
      const scoreTextGeom = scoreText.getBounds();
      scoreText.setPosition(this.screenCenterX - scoreTextGeom.width / 2, 10);
    });

    this.spinWheel.events.on(MOUSE_EVENTS.FALSE_CLICK, () => {
      this.cameras.main.shake(100, 0.002);
      this.spinWheel.gameObject.setTint(0xff0000);
      setTimeout(() => {
        this.spinWheel.gameObject.clearTint();
      }, 100);
    });
  }

  saveHighScore() {}
}
