let gpio = require("onoff").Gpio;
let LED = new gpio(3, "out");
let BUTTON = new gpio(2, "in", "both");

button.watch((err, value) => {
  console.log(err, value);
  led.writeSync(0);
});

function initLED(pin) {
  LED = new gpio(pin, "out");
}

function turnOn() {
  LED.writeSync(1);
}

function turnOff() {
  LED.writeSync(0);
}

function blink() {
  if (LED.readSync == 0) {
    turnOn();
  } else {
    turnOff();
  }
}

let blinkInterval = null;

function startBlinking() {
  blinkInterval = setInterval(blink, 100);
}

function stopBlinkingAfter(time) {
  setTimeout(() => {
    clearInterval(blinkInterval);
    LED.writeSync(0);
  }, time);
}

module.exports = {
  turnOn,
  turnOff,
  initLED,
  startBlinking,
  stopBlinkingAfter
};
