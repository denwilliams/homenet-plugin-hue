/// <reference path="./hue-api.d.ts"/>

import {plugin, service, IPluginLoader, ILogger, IConfig, ILightsManager, ISettable, IClassTypeFactory} from '@homenet/core';

import { HueController } from './hue-controller';
import { HueLight } from './hue-light';

@plugin()
export class HuePluginLoader implements IPluginLoader {
  private controller : HueController;

  constructor(
          @service('IConfig') private config: IConfig,
          @service('ILightsManager') private lights: ILightsManager,
          @service('ILogger') private logger: ILogger) {
    this.controller = new HueController(config, logger);
    const lightFactory: IClassTypeFactory<ISettable> = this.hueLightFactory.bind(this);
    lights.addSettableType('hue', lightFactory);
  }

  load() : void {
    this.logger.info('Loading hue lights');
  }

  private hueLightFactory(id : string, opts : any) : ISettable {
    this.logger.info('Adding Hue light: ' + id);
    return new HueLight(id, opts, this.controller, this.logger);
  }
}
