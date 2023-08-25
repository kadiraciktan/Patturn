export function Component() {
  return function (target: any) {
    class DecoratedComponent extends target {
      constructor(...args: any[]) {
        super(...args);
        if (this.scene) {
          if (
            this.scene.preload &&
            typeof this.scene.preload === "function" &&
            this.preload &&
            typeof this.preload === "function"
          ) {
            const preload = this.scene.preload.bind(this.scene);
            this.scene.preload = () => {
              preload();
              this.preload();
            };
          }

          if (
            this.scene.create &&
            typeof this.scene.create === "function" &&
            this.create &&
            typeof this.create === "function"
          ) {
            const create = this.scene.create.bind(this.scene);
            this.scene.create = () => {
              create();
              this.create();
            };
          }

          if (
            this.scene.update &&
            typeof this.scene.update === "function" &&
            this.update &&
            typeof this.update === "function"
          ) {
            const update = this.scene.update.bind(this.scene);
            this.scene.update = () => {
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
