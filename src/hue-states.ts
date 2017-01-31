var hue = require('node-hue-api');
var lightState = hue.lightState;

// WHITE STATES
var MID = 350;
var WARM = 400;
var X_WARM = 500;
var BRIGHT = 250;

// HUES
const HUE = {
  BLOOD_ORANGE: 350,
  RED: 0,
  GREEN: 145,
  BLUE: 250,
  PURPLE: 280
}

const BRIGHTNESS = {
  MAX: 100,
  HIGH: 75,
  MED: 50,
  LOW: 25,
  MIN: 1
};

const SATURATION = {
  MAX: 100,
  HIGH: 75,
  MED: 50,
  LOW: 25,
  MIN: 1
};

export const STATES = {
  bright: lightState.create().on().white(BRIGHT, BRIGHTNESS.MAX),
  warm: lightState.create().on().white(X_WARM, BRIGHTNESS.MAX),
  full: lightState.create().on().white(MID, BRIGHTNESS.MAX),

  high: lightState.create().on().white(WARM, BRIGHTNESS.HIGH),

  medium: lightState.create().on().white(WARM, BRIGHTNESS.MED),
  med: lightState.create().on().white(WARM, BRIGHTNESS.MED),

  low: lightState.create().on().white(WARM, BRIGHTNESS.LOW),
  fadelow: lightState.create().on().white(WARM, BRIGHTNESS.LOW).transition(5000),

  minimum: lightState.create().on().white(WARM, BRIGHTNESS.MIN),
  min: lightState.create().on().white(WARM, BRIGHTNESS.MIN),

  off: lightState.create().off(),
  fadeoff: lightState.create().off().transition(10000),

  movie: lightState.create().on().hsl(HUE.BLOOD_ORANGE, SATURATION.MAX, BRIGHTNESS.LOW).transition(3000),

  red: lightState.create().hsl(HUE.RED, SATURATION.MAX, BRIGHTNESS.MAX).on(),
  redalert: lightState.create().hsl(HUE.RED, SATURATION.MAX, BRIGHTNESS.MAX).on().alert('lselect'),
  green: lightState.create().hsl(HUE.GREEN, SATURATION.MAX, BRIGHTNESS.MAX).on(),
  greenalert: lightState.create().hsl(HUE.GREEN, SATURATION.MAX, BRIGHTNESS.MAX).on().alert('lselect'),
  blue: lightState.create().hsl(HUE.BLUE, SATURATION.MAX, BRIGHTNESS.MAX).on(),
  bluealert: lightState.create().hsl(HUE.BLUE, SATURATION.MAX, BRIGHTNESS.MAX).on().alert('lselect'),
  purple: lightState.create().hsl(HUE.PURPLE, SATURATION.MAX, BRIGHTNESS.MAX).on(),
  purplealert: lightState.create().hsl(HUE.PURPLE, SATURATION.MAX, BRIGHTNESS.MAX).on().alert('lselect'),

  party: lightState.create().on().hsl(HUE.RED, SATURATION.MAX, BRIGHTNESS.MAX).effect('colorloop'),

  test: lightState.create().on().hsl(300, SATURATION.MAX, 60).effect('none').transition(5000),
  test2: lightState.create().alert().white(500, 10)
};

