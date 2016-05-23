declare module 'homenet-plugin-hue' {
  import {IPluginLoader} from 'homenet-core';
  export var HuePluginLoader: new (...args: any[]) => IPluginLoader
}
