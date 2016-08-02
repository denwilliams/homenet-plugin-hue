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

let MODES: any = {
  'bright':   lightState.create().on().white(BRIGHT, BRIGHTNESS.MAX),
  'warm':     lightState.create().on().white(X_WARM, BRIGHTNESS.MAX),
  'full':     lightState.create().on().white(MID, BRIGHTNESS.MAX),

  'high':     hue.lightState.create().on().white(WARM, BRIGHTNESS.HIGH),

  'medium':   hue.lightState.create().on().white(WARM, BRIGHTNESS.MED),
  'med':      hue.lightState.create().on().white(WARM, BRIGHTNESS.MED),

  'low':      hue.lightState.create().on().white(WARM, BRIGHTNESS.LOW),

  'minimum':  hue.lightState.create().on().white(WARM, BRIGHTNESS.MIN),
  'min':      hue.lightState.create().on().white(WARM, BRIGHTNESS.MIN),

  'off':     lightState.create().off(),

  'movie':   lightState.create().on().hsl(HUE.BLOOD_ORANGE, SATURATION.MAX, BRIGHTNESS.LOW).transition(3000),

  'red':     hue.lightState.create().hsl(HUE.RED,     SATURATION.MAX, BRIGHTNESS.MAX).on(),
  'green':   hue.lightState.create().hsl(HUE.GREEN,   SATURATION.MAX, BRIGHTNESS.MAX).on(),
  'blue':    hue.lightState.create().hsl(HUE.BLUE,    SATURATION.MAX, BRIGHTNESS.MAX).on(),
  'purple':  hue.lightState.create().hsl(HUE.PURPLE,  SATURATION.MAX, BRIGHTNESS.MAX).on(),

  'party':    hue.lightState.create().on().hsl(HUE.RED, SATURATION.MAX, BRIGHTNESS.MAX).effect('colorloop'),

  'test':     hue.lightState.create().on().hsl(300, SATURATION.MAX, 60).effect('none').transition(5000),
  'test2':    hue.lightState.create().alert().white(500, 10)
};

MODES.fadelow = MODES.low.transition(5000);
MODES.fadeoff = MODES.off.transition(20000);
MODES.redalert = MODES.red.alert('lselect');
MODES.greenalert = MODES.green.alert('lselect');
MODES.bluealert = MODES.blue.alert('lselect');
MODES.purplealert = MODES.purple.alert('lselect');
export = MODES;
