/// <reference path="./hue-api.d.ts"/>

import { ILightSwitch, ILogger } from 'homenet-core';

const hue = require('node-hue-api');
const HueApi = hue.HueApi;
const lightState = hue.lightState;

import HueController = require('./hue-controller');
import STATES = require('./hue-states');
import {EventEmitter} from 'events';

class HueLight extends EventEmitter implements ILightSwitch {
  state: string;

  private setLightState : Function;

  constructor(id : string, opts : any, controller: HueController, private logger: ILogger) {
    super();

    this.state = 'unknown';

    const hubId = opts.hub;
    const groupId = opts.groupId;

    this.setLightState = (controller.setGroupLightState).bind(controller, hubId, groupId);
  }

  set(value: string|boolean) {
    this.state  = value === true ? 'full' : <string>value;
    this.logger.info('SET HUE LIGHT STATE TO ' + value);
    this.setLightState(getLightStateForValue(value));
  }

  get() : string {
    return this.state;
  }
}

function getLightStateForValue(value: string|boolean) : string {
  if (value === true) return lightState.create().turnOn();
  if (value === false) return lightState.create().turnOff();
  return STATES[<string> value];
}

export = HueLight;
