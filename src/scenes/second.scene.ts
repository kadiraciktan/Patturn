import { Scene } from "@patturn/engine";

export class SecondScene extends Scene {
  constructor() {
    super("SecondScene");
  }
  preload() {
    console.log("preload");
  }
  create() {}
}
