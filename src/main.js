var axios = require("axios");
var constants = require("./constants");
var config = require("./config");
var LED = require("./led_handler");

console.log("Initialiazing ApiMonitor");

let sizeOfLast = 0;
let signal = false;
let activeThreads = 0;

console.log(constants.apiRoute);

function login() {
  console.log("Loggin in");
  axios.post(constants.apiRoute + "auth/login", constants.loginObject).then(
    success => {
      axios.defaults.headers.common["Authorization"] =
        success.headers.authorization;
      loggedIn = true;
      console.log("Logged in");
    },
    error => {
      console.log("Logged in failed");
      console.log(error);
    }
  );
}

function fetch() {
  return axios.get(constants.apiRoute + "phonesessionregister");
}

function handleFetching(response) {
  let data = response.data;
  let size = data.length;
  if (sizeOfLast < size) {
    console.log("New Request");
    LED.turnOn();
    sizeOfLast = size;
  }
}

async function doLooping() {
  activeThreads++;
  while (1) {
    console.log(`ActiveThreads = {${activeThreads}}`);
    console.log("Fetching");
    fetch().then(
      fetchSuccess => {
        console.log("Fetch successful");
        handleFetching(fetchSuccess.data);
      },
      error => {
        console.log(error.response.statusText);
        if (error.response.statusText === "Unauthorized") {
          console.log("Credentials Expired");
          activeThreads--;
          return;
        }
      }
    );
    await config.timer(5000);
  }
}

async function loop() {
  while (1) {
    console.log("Loggin in");
    login();
    await config.timer(3000);
    await doLooping();
  }
}

loop();
