import * as _ from 'lodash';

import { Dict, ILogger, IConfig } from '@homenet/core';

const hue = require('node-hue-api');
// import hueHub = require('./hue-hub');
const HueApi = hue.HueApi;

interface IHubConfig {id:string, name:string, host:string, key:string}

export class HueController {
  private hubs: Dict<IHueApi>;

  constructor(config: IConfig, private logger: ILogger) {
    this.hubs = createHubs(config.hue.hubs, logger);
  }

  getHub(hubId: string) : IHueApi {
    return this.hubs[hubId];
  }

  setGroupLightState(hubId: string, groupId: string, value: any) : void {
    this.logger.info('Setting light for ' + hubId + groupId);
    this.getHub(hubId).setGroupLightState(groupId, value);
  }

  setLightState(hubId: string, lightId: string, value: any) : void {
    this.logger.info('Setting light for ' + hubId + lightId);
    this.getHub(hubId).setLightState(lightId, value);
  }
}

function createHubs(hubs: Array<IHubConfig>, logger: ILogger) : Dict<IHueApi> {
  const res : Dict<IHueApi> = {};
  hubs.forEach(function(hub: IHubConfig) {
    const id = hub.id;
    const name = hub.name;
    const host = hub.host;
    const key = hub.key;

    logger.info('Setting up Hue hub ' + name + ' (' + id + ') on ' + host);

    const hubApi: IHueApi = createHub(host, key);
    // debugPrintHub(hub, hubApi);
    res[id] = hubApi;
  });

  return res;
}

function createHub(host: string, key: string) : IHueApi {
  return new HueApi(host, key);
}
