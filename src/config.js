var axios = require('axios');
var constants = require('./constants');

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
	while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
	console.log('Done sleeping for ' + sleepDuration);
}

module.exports = {
	sleepFor
}