// scripts/createCopies.js
const fs = require('fs');
const path = require('path');
const metadataConfig = require('../config2.json');

function calculateDistribution(totalCopies, distributionPercentages) {
    const distributionCounts = distributionPercentages.map(percentage => Math.floor(totalCopies * (percentage / 100)));
    let remainder = totalCopies - distributionCounts.reduce((a, b) => a + b, 0);
    
    distributionCounts.forEach((count, index) => {
        while (remainder > 0 && distributionCounts[index] < count + 1) {
            distributionCounts[index]++;
            remainder--;
        }
    });

    return distributionCounts;
}

function createCopies(totalCopies, distributionPercentages) {
    const sourceImagePath = path.join(__dirname, '..', 'layers', 'x_one_layer');
    const baseImagePath = path.join(__dirname, '..', 'images', 'gen0');
    const baseMetadataPath = path.join(__dirname, '..', 'mdata', 'gen0');

    if (!fs.existsSync(baseImagePath)) fs.mkdirSync(baseImagePath, { recursive: true });
    if (!fs.existsSync(baseMetadataPath)) fs.mkdirSync(baseMetadataPath, { recursive: true });

    const numberOfCopiesArray = calculateDistribution(totalCopies, distributionPercentages);
    let copyIndex = fs.readdirSync(baseImagePath).filter(file => file.endsWith('.png')).length + 1;

    numberOfCopiesArray.forEach((copiesCount, index) => {
        for (let j = 0; j < copiesCount; j++) {
            const sourceFileName = `${index + 1}.png`;
            const outputFileName = `${copyIndex}.png`;
            const outputPath = path.join(baseImagePath, outputFileName);
            const metadataPath = path.join(baseMetadataPath, `${copyIndex}.json`);
            
            fs.copyFileSync(path.join(sourceImagePath, sourceFileName), outputPath);

            const metadata = {
                name: `${metadataConfig.name} #${copyIndex}`,
                description: metadataConfig.description,
                image: `${metadataConfig.image}${outputFileName}`,
                edition: copyIndex,
                date: new Date().toISOString(),
                attributes: [
                    {
                        trait_type: "Potion Type",
                        value: metadataConfig.potionTypes[index]
                    }
                ]
            };

            fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

            console.log(`Copy ${outputFileName} generated for potion type: ${metadataConfig.potionTypes[index]}`);
            copyIndex++;
        }
    });

    console.log("\nFinal distribution of copies:");
    numberOfCopiesArray.forEach((num, i) => {
        console.log(`Potion type '${metadataConfig.potionTypes[i]}': ${num} copies (${((num / totalCopies) * 100).toFixed(2)}%)`);
    });
}

module.exports = { createCopies };