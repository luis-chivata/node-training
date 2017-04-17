var moment = require("moment");
var colors = require("colors/safe");
var currentHour = moment().format("H");
var currentTime = "";
var currentColor;
var phrases = {
    morning: 'Buenos dias',
    afternoon: 'Buenas tardes',
    night: 'Buenas noches'
};

if(currentHour < 12) {
    currentTime = "morning";
    currentColor = colors.green;
}
else if(currentHour < 18) {
    currentTime = "afternoon";
    currentColor = colors.yellow;
}
else {
    currentTime = "night";
    currentColor = colors.red;
}
console.log( currentColor(phrases[currentTime]) );