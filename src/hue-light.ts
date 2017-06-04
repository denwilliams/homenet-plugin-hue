/// <reference path="./hue-api.d.ts"/>

import { ISettable, ILogger } from '@homenet/core';

const hue = require('node-hue-api');
const HueApi = hue.HueApi;
const lightState = hue.lightState;

import { HueController } from './hue-controller';
import { STATES } from './hue-states';
import { EventEmitter } from 'events';

export class HueLight extends EventEmitter implements ISettable {
  private state: string;
  private hubId: string;
  private setLightState : Function;

  constructor(public id : string, opts : any, controller: HueController, private logger: ILogger) {
    super();

    this.state = 'unknown';

    this.hubId = opts.hub;
    const groupId = opts.groupId;
    const lightId = opts.lightId;

    if (groupId) this.setLightState = (controller.setGroupLightState).bind(controller, this.hubId, groupId);
    else this.setLightState = (controller.setLightState).bind(controller, this.hubId, lightId);
  }

  set(value: string|boolean) {
    const state = this.state  = value === true ? 'full' : <string>value;
    this.logger.info('Hue light set to ' + state);
    const lightState = getLightStateForValue(state);
    this.setLightState(lightState);
    this.emit('update', state);
    // TODO: poll for changes when light is turned on from external switch/app
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
