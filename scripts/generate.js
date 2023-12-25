// scripts/generate.js
const { generateImage } = require('./gen');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('../config.json');

function getAllLayerCombinations(layers) {
    let combinations = [[]];

    layers.forEach(layerConfig => {
        const newCombinations = [];
        layerConfig.options.forEach(option => {
            combinations.forEach(existingCombo => {
                newCombinations.push([...existingCombo, { folder: layerConfig.folder, filename: option }]);
            });
        });
        combinations = newCombinations;
    });

    return combinations;
}

function createMetadata(combination, index, config) {
    const attributes = combination.map(layer => ({
        trait_type: layer.folder,
        value: path.basename(layer.filename, '.png')
    }));

    const dna = crypto.createHash('sha256').update(JSON.stringify(combination)).digest('hex');

    const metadata = {
        dna: dna,
        name: `${config.name} #${index + 1}`,
        collectionName: `${config.collectionName}`,
        description: config.description,
        image: `${config.image}${index + 1}.png`,
        edition: index + 1,
        date: Date.now(),
        attributes: attributes,
        compiler: "@ruffbuff"
    };

    return metadata;
}

async function generateAllImages() {
    const combinations = getAllLayerCombinations(config.layers);
    console.log(`Generating ${combinations.length} images and metadata...`);

    const baseImagePath = path.join('images', 'gen0');
    const baseMetadataPath = path.join('mdata', 'gen0');

    for (let i = 0; i < combinations.length; i++) {
        const outputFileName = `${i + 1}.png`;
        const outputPath = path.join(baseImagePath, outputFileName);
        const metadataPath = path.join(baseMetadataPath, `${i + 1}.json`);
        const combinationConfig = { ...config, layers: combinations[i] };

        await generateImage(combinationConfig, outputPath);
        console.log(`Image ${outputFileName} generated`);

        const metadata = createMetadata(combinations[i], i, config);

        if (!fs.existsSync(baseMetadataPath)) {
            fs.mkdirSync(baseMetadataPath, { recursive: true });
        }

        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        console.log(`Metadata ${i + 1}.json generated`);
    }
}

module.exports = { generateAllImages };