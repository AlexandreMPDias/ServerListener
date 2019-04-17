let GPIO = require("onoff").Gpio;
let BUTTON = new GPIO(4,"in", "both");

BUTTON.watch( (err, value) => {
	console.log(err);
	console.log(value);
});