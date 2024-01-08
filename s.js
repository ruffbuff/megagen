const readline = require('readline');
const { generateAllImages } = require('./scripts/generate');
const { replaceImageBaseUrl } = require('./scripts/updateUrl');
const { createCopies } = require('./scripts/createCopies');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Choose a command, set number only: (generate == 1; update-url == 2; create-copies == 3): ', function (command) {
    if (command === '1') {
        generateAllImages().then(() => rl.close());
    } else if (command === '2') {
        rl.question('Enter new base URL: ', function (newBaseUrl) {
            replaceImageBaseUrl(newBaseUrl);
            rl.close();
        });
    } else if (command === '3') {
        rl.question('Enter the total number of copies to create: ', function (totalInput) {
            const totalCopies = parseInt(totalInput);
            if (isNaN(totalCopies)) {
                console.log("Invalid number of copies.");
                rl.close();
                return;
            }
            rl.question('Enter distribution percentages (e.g., 5,20,30,45): ', function (distributionInput) {
                const distributionPercentages = distributionInput.split(',').map(Number);
                if (distributionPercentages.some(isNaN)) {
                    console.log("Invalid distribution percentages.");
                    rl.close();
                    return;
                }
                createCopies(totalCopies, distributionPercentages);
                rl.close();
            });
        });
    } else {
        console.log("Unknown command.");
        rl.close();
    }
});