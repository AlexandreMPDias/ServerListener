
var axios = require('axios');
var constants = require('./constants');
var config = require('./config');

console.log("Initialiazing ApiMonitor");

let lastResponseData = null;
let sleeping = false;
let loggedIn = false;

function login() {
	console.log('Loggin in')
	axios.post(constants.apiRoute + "auth/login", constants.loginObject).then(success => {
		axios.defaults.headers.common['Authorization'] = success.headers.authorization;
		loggedIn = true;
		console.log('Logged in')
	}, error => {
		console.log('Logged in failed')
		console.log(error);
	})
}

function fetch() {
	return axios.head(constants.apiRoute + "phonesessionregister");

}

function handleFetching(data) {
	console.log(data);
}

function doLooping() {
	while(1) {
		console.log('Going for it')
		config.sleepFor(2000);
		console.log('Doing the fetch')
			fetch().then( fetchSuccess => {
				console.log('Fetch successful')
				console.log(fetchSuccess.data)
				handleFetching(fetchSuccess.data);
			}, error => {
				console.log(error.response.statusText);
				if(error.response.statusText === 'Unauthorized') {
					console.log("Credentials Expired");
					return;
				}
			})
	}
}

console.log(constants.apiRoute);

function timer(ms) {
	return new Promise(res => setTimeout(res, ms));
}

async function loop () {
	while(1) {
		login();
		await timer(3000);
		doLooping();
	}
}

loop();