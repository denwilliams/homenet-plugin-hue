/// <reference path="./hue-api.d.ts"/>

import {plugin, service, IPluginLoader, ILogger, IConfig, ILightsManager, ILightSwitch, ILightSwitchFactory} from 'homenet-core';

// var hue = require('node-hue-api');
// var lightState = hue.lightState;

// import HueLight = require('./hue-light')
import HueController = require('./hue-controller');
import HueLight = require('./hue-light');


// import lightFactory = require('./lights');
// import createLockFactory = require('./lock');

@plugin()
export class HuePluginLoader implements IPluginLoader {
  private controller : HueController;

  constructor(
          @service('IConfig') private config: IConfig,
          @service('ILightsManager') private lights: ILightsManager,
          @service('ILogger') private logger: ILogger) {
    this.controller = new HueController(config, logger);
    const lightFactory: ILightSwitchFactory = this.hueLightFactory.bind(this);
    lights.addType('hue', lightFactory);
  }

  load() : void {
    this.logger.info('Loading hue lights');
  }

  private hueLightFactory(id : string, opts : any) : ILightSwitch {
    this.logger.info('Adding Hue light: ' + id);
    return new HueLight(id, opts, this.controller, this.logger);
  }
}
