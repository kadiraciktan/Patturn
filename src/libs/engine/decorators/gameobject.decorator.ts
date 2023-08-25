export function GameObject() {
  return function (target: any) {
    class DecoratedComponent extends target {
      constructor(...args: any[]) {
        super(...args);
        if (this.gameScene) {
          if (
            this.gameScene.preload &&
            typeof this.gameScene.preload === "function" &&
            this.preload &&
            typeof this.preload === "function"
          ) {
            const preload = this.gameScene.preload.bind(this.gameScene);
            this.gameScene.preload = () => {
              preload();
              this.preload();
            };
          }

          if (
            this.gameScene.create &&
            typeof this.gameScene.create === "function" &&
            this.create &&
            typeof this.create === "function"
          ) {
            const create = this.gameScene.create.bind(this.gameScene);
            this.gameScene.create = () => {
              create();
              this.create();
            };
          }

          if (
            this.gameScene.update &&
            typeof this.gameScene.update === "function" &&
            this.update &&
            typeof this.update === "function"
          ) {
            const update = this.gameScene.update.bind(this.gameScene);
            this.gameScene.update = () => {
              update();
              this.update();
            };
          }
        }
      }
    }

    return DecoratedComponent as any;
  };
}
