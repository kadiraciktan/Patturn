export class ImageLoaderPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
  }

  init() {
    console.log("ImageLoaderPlugin init");
  }

  preload() {
    console.log("ImageLoaderPlugin preload");
  }
}
