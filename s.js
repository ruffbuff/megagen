// s.js
const readline = require('readline');
const { generateAllImages } = require('./scripts/generate');
const { replaceImageBaseUrl } = require('./scripts/updateUrl');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Choose a command, set number only: (generate == 1; update-url == 2): ', function (command) {
    if (command === '1') {
        generateAllImages().then(() => rl.close());
    } else if (command === '2') {
        rl.question('Enter new base URL: ', function (newBaseUrl) {
            replaceImageBaseUrl(newBaseUrl);
            rl.close();
        });
    } else {
        console.log("Unknown command.");
        rl.close();
    }
});