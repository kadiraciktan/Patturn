import Phaser from "phaser";
import { AnalogControl } from "./analog.control";
import { UIManager } from "./ui.manager";

export class Scene extends Phaser.Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup;
  uiManager = new UIManager(this);
  private graphics: Phaser.GameObjects.Graphics;
  pattern: Phaser.GameObjects.Image;
  blackCircle: Phaser.GameObjects.Image;
  whiteCircle: Phaser.GameObjects.Image;
  currentRotation: "clockwise" | "anticlockwise" = "clockwise";
  patternSpeed = 1;
  PATTERN_SCALE = 0.2;
  patternWheel: Phaser.Physics.Arcade.Group;
  patternGroup: Phaser.Physics.Arcade.Group;
  blackCirclePosition: Phaser.Math.Vector2;
  whiteCirclePosition: Phaser.Math.Vector2;

  constructor(config) {
    super(config);
  }

  preload() {
    this.load.setBaseURL("src/assets/");
    this.load.image("pattern", "yinyang.svg");
    this.load.image("whitecircle", "whitecircle.svg");
  }

  create() {
    this.createLogTexts();
    let width = this.game.config.width as number;
    let height = this.game.config.height as number;
    let screenCenterX = width * 0.5;
    let screenCenterY = height * 0.5;

    this.pattern = this.add.image(screenCenterX, screenCenterY, "pattern");
    this.pattern.scale = this.PATTERN_SCALE;

    this.blackCircle = this.add.image(
      screenCenterX,
      screenCenterY,
      "whitecircle"
    );
    this.blackCircle.scale = this.PATTERN_SCALE;
    this.blackCircle.setTint(0x000000);
    this.blackCircle.setInteractive();
    this.blackCircle.setAlpha(0.5);
    this.blackCircle.x = screenCenterX - 5;
    this.blackCircle.y = screenCenterY - 50;
    this.blackCirclePosition = new Phaser.Math.Vector2(
      this.blackCircle.x,
      this.blackCircle.y
    );

    this.whiteCircle = this.add.image(
      screenCenterX,
      screenCenterY,
      "whitecircle"
    );
    this.whiteCircle.scale = this.PATTERN_SCALE;
    this.whiteCircle.setTint(0xffffff);
    this.whiteCircle.setInteractive();
    this.whiteCircle.setAlpha(0.5);
    this.whiteCircle.x = screenCenterX + -5;
    this.whiteCircle.y = screenCenterY + 50;
    this.whiteCirclePosition = new Phaser.Math.Vector2(
      this.whiteCircle.x,
      this.whiteCircle.y
    );




     

    // Rastgele dairelerin eklenmesi
    var numCircles = 2;
    var angleStep = 360 / numCircles; // Dağıtım açısı adımı

    var circlegroup = this.add.group();

    for (var i = 0; i < numCircles; i++) {
      var angle = angleStep * i; // Açı hesaplanıyor
      var radius = 53;
      var circleX = this.pattern.x + radius * Math.cos((angle * Math.PI) / 180);
      var circleY = this.pattern.y + radius * Math.sin((angle * Math.PI) / 180);

      var minDistance = 50; // Minimum uzaklık
      var circleX = this.pattern.x + radius * Math.cos((angle * Math.PI) / 180);
      var circleY = this.pattern.y + radius * Math.sin((angle * Math.PI) / 180);
      var circleType = Math.random() > 0.5 ? "whitecircle" : "blackcircle"; // Rastgele siyah veya beyaz
      const sprite = this.add.sprite(circleX, circleY, "whitecircle");

      if (circleType === "blackcircle") {
        sprite.setTint(0x000000);
      }

      sprite.scale = this.PATTERN_SCALE;
      sprite.setInteractive();

      circlegroup.add(sprite);
    }

    // circlegroup z-index ayarı 
    this.children.bringToTop(this.pattern);

    this.scale.on("orientationchange", (orientation) => {
      width = this.game.config.width as number;
      height = this.game.config.height as number;
      if (orientation.includes("portrait")) {
        this.scale.setGameSize(width, height);
      } else {
        this.scale.setGameSize(height, width);
      }
    });

    this.scale.on("resize", (gameSize) => {
      const { width, height } = gameSize;
      screenCenterX = width * 0.5;
      screenCenterY = height * 0.5;

      this.pattern.setPosition(screenCenterX, screenCenterY);
      this.cameras.resize(width, height);
    });
    this.pattern.setInteractive();

    this.pattern.on("pointerdown", () => {
      this.patternSpeed += 1;
      if (this.currentRotation === "clockwise") {
        this.currentRotation = "anticlockwise";
      } else {
        this.currentRotation = "clockwise";
      }
    });
  }

  update() {
    if (this.currentRotation === "clockwise") {
      this.pattern.angle += this.patternSpeed;
    } else {
      this.pattern.angle -= this.patternSpeed;
    }

    var angleInRadians = (this.pattern.angle * Math.PI) / 180;

    var rotationCenterX = this.pattern.x;
    var rotationCenterY = this.pattern.y;

    this.blackCircle.x =
      rotationCenterX +
      (this.blackCirclePosition.x - rotationCenterX) *
        Math.cos(angleInRadians) -
      (this.blackCirclePosition.y - rotationCenterY) * Math.sin(angleInRadians);
    this.blackCircle.y =
      rotationCenterY +
      (this.blackCirclePosition.x - rotationCenterX) *
        Math.sin(angleInRadians) +
      (this.blackCirclePosition.y - rotationCenterY) * Math.cos(angleInRadians);

    this.whiteCircle.x =
      rotationCenterX +
      (this.whiteCirclePosition.x - rotationCenterX) *
        Math.cos(angleInRadians) -
      (this.whiteCirclePosition.y - rotationCenterY) * Math.sin(angleInRadians);
    this.whiteCircle.y =
      rotationCenterY +
      (this.whiteCirclePosition.x - rotationCenterX) *
        Math.sin(angleInRadians) +
      (this.whiteCirclePosition.y - rotationCenterY) * Math.cos(angleInRadians);
  }

  destroy() {}

  private createLogTexts() {
    this.uiManager.create();

    const currentFPS = this.uiManager.addText("FPS: 0", 50, 30, {
      fontSize: "30px",
      color: "#FFFFFF",
    });

    // add FPS counter
    this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        currentFPS.setText("FPS: " + this.game.loop.actualFps.toFixed(2));
      },
    });

    const log2Text = this.uiManager.addText("log2", 50, 90, {
      fontSize: "20px",
      color: "#FFFFFF",
    });

    const deviceLogText = this.uiManager.addText("device", 50, 120, {
      fontSize: "20px",
      color: "#FFFFFF",
    });

    const device = this.game.device;
    const isAndroid = device.os.android;
    const isIOS = device.os.iOS;
    const isChrome = device.browser.chrome;
    const isSafari = device.browser.safari;

    deviceLogText.setText(
      "android : " +
        isAndroid +
        ", ios " +
        isIOS +
        ", Chrome " +
        isChrome +
        ", Safari " +
        isSafari +
        ", isPortrait " +
        screen.orientation.type
    );
  }
}
