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

@SceneDecorator()
export class GameScene extends Scene {
  mainMenu = new MainMenuGameObject(this);
  spinWheel = new SpinWheelGameObject(this);
  score: number = 0;

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

    const scoreText = this.add
      .text(0, 10, this.score.toString(), {
        fontSize: "32px",
        color: "#fff",
        fontStyle: "bold",
        backgroundColor: "#000",
      })
      .setVisible(false);

    const menuTextGeom = scoreText.getBounds();
    scoreText.setPosition(this.screenCenterX - menuTextGeom.width / 2, 10);

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
    this.mainMenu.container.depth = 1;

    this.spinWheel.show();
    this.spinWheel.events.on(MOUSE_EVENTS.CLICK, () => {
      this.spinWheel.currentSpeed += 1;
      this.score += 1;
      scoreText.setText(`${this.score}`);

      const scoreTextGeom = scoreText.getBounds();
      scoreText.setPosition(this.screenCenterX - scoreTextGeom.width / 2, 10);
    });

    this.spinWheel.gameObject.setDepth(1);
  }
}
