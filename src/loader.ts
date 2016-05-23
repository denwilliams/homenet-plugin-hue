/// <reference path="./hue-api.d.ts"/>

import {plugin, service, IPluginLoader, ILogger, IConfig, ILightsManager, ILight, ILightFactory} from 'homenet-core';

// var hue = require('node-hue-api');
// var lightState = hue.lightState;

// import HueLight = require('./hue-light')
import HueController = require('./hue-controller');
import HueLight = require('./hue-light');


// import lightFactory = require('./lights');
// import createLockFactory = require('./lock');

@plugin()
export class HuePluginLoader implements IPluginLoader {

  private _logger : ILogger;
  private _config : IConfig;
  private _lights : ILightsManager;
  private _controller : HueController;

  constructor(
          @service('IConfig') config: IConfig,
          @service('ILightsManager') lights: ILightsManager,
          @service('ILogger') logger: ILogger) {
    this._logger = logger;
    this._lights = lights;
    this._logger = logger;
    this._controller = new HueController(config, logger);

    let lightFactory: ILightFactory;
    lightFactory = this._hueLightFactory.bind(this);
    lights.addType('hue', lightFactory);
  }

  load() : void {
    this._logger.info('Loading hue lights');
  }

  _hueLightFactory(id : string, opts : any) : ILight {
    this._logger.info('Adding Hue light: ' + id);
    return new HueLight(id, opts, this._controller, this._logger);
  }
  //
  //
  // factory(config: IConfig, lights: ILightsManager, logger: ILogger) : ILightFactory {
  //
  //   // var hubs: Dict<IHueApi> = {};
  //   var controller = new HueController(config, logger);
  //   //
  //   // if (config.hue && config.hue.hubs) {
  //   //   config.hue.hubs.forEach(function(hub: {id:string, name:string, host:string, key:string}) {
  //   //     var id = hub.id;
  //   //     var name = hub.name;
  //   //     var host = hub.host;
  //   //     var key = hub.key;
  //   //
  //   //     logger.info('Setting up hub ' + name + ' (' + id + ') on ' + host);
  //   //
  //   //     var hubApi: IHueApi = hueHub.create(host, key);
  //   //     debugPrintHub(hub, hubApi);
  //   //     hubs[id] = hubApi;
  //   //   });
  //   // }
  //   //
  //   //
  //   // function logError(err: Error) {
  //   //   logger.error(err.toString());
  //   // }
  //   //
  //
  //   return hueLightFactory;
  // }
}


//
// function createHubs(hubs: Array<IHubConfig>, logger: ILogger) : Dict<IHueApi> {
//   return _.keyBy(hubs.map(function(hub: IHubConfig) {
//     var id = hub.id;
//     var name = hub.name;
//     var host = hub.host;
//     var key = hub.key;
//
//     logger.info('Setting up hub ' + name + ' (' + id + ') on ' + host);
//
//     var hubApi: IHueApi = hueHub.create(host, key);
//     debugPrintHub(hub, hubApi);
//     hubs[id] = hubApi;
//   }), 'id');
// }

//
// function debugPrintHub(hub: any, hubApi: any) {
//   hubApi.lights()
//   .then(function(result: {lights: {id: string, name: string, type:string}[]}) {
//     result.lights.forEach(function(light) {
//       logger.debug('Found Hue light: [' + hub.id + ':' + light.id + '] ' + light.name + ' (' + light.type + ')');
//     });
//   })
//   .fail(logError)
//   .done();
//
//   hubApi.groups()
//   .then(function(groups: any[]) {
//     groups.forEach(function(group: {id:string, name:string}) {
//       logger.debug('Found Hue group: [' + hub.id + ':g' + group.id + '] ' + group.name);
//     });
//   })
//   .fail(logError)
//   .done();
// }
