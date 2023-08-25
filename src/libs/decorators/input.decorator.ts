export function Input() {
  return function (target: any, propertyKey: string) {
    console.log("Input Decorator", target);
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this.scene.input;
      },
      set: function (input) {
        this.scene.input = input;
      }
    });
  };
}
