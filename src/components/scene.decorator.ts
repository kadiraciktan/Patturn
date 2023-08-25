export function Scene(name: string) {
  return function (target: any) {
    console.log("Scene Decorator", target.prototype);
    Object.defineProperty(target.prototype, "scene", {
      get: function () {
        return this._scene;
      },
      set: function (scene) {
        this._scene = scene;
      },
    });
    Object.defineProperty(target.prototype, "name", {
      get: function () {
        return this._name;
      },
      set: function (name) {
        this._name = name;
      },
    });
  };
}
