import { Scene } from "@patturn/engine";

export const drawMenuRect = (
  scene: Scene,
  bgColor: number,
  borderColor: number
) => {
  const rectWidth = scene.gameWidth - 20 * 2;
  const rectHeight = scene.gameHeight - 20 * 2;
  const rectPositionX = 20;
  const rectPositionY = 20;
  const rectGeom = new Phaser.Geom.Rectangle(
    rectPositionX,
    rectPositionY,
    rectWidth,
    rectHeight
  );

  const rect = scene.add.rectangle(
    rectGeom.centerX,
    rectGeom.centerY,
    rectWidth,
    rectHeight,
    bgColor
  );
  rect.setStrokeStyle(4, borderColor);
  rect.setInteractive();
  return rect;
};
