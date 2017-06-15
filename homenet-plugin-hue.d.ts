declare module 'homenet-plugin-hue' {
  import {IPluginLoader} from '@homenet/core';
  export function create(annotate: any): { HuePluginLoader: new (...args: any[]) => IPluginLoader }
}
