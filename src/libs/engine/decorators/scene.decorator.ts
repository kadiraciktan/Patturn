export function SceneDecorator() {
  return function (target: any | undefined) {
    if (!target) {
      console.error("SceneDecorator: target is undefined");
      return;
    }

    class SceneDecoratorComponent extends target {
      constructor(...args: any[]) {
        super(...args);
      }
      preload() {
        this.ScenePreload();
        super.preload();
      }

      create() {
        this.SceneCreate();
        super.create();
      }
    }

    return SceneDecoratorComponent as any;
  };
}
