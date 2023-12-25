// scripts/gen.js
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

async function generateImage(config, outputPath) {
    const canvas = createCanvas(config.width, config.height);
    const ctx = canvas.getContext('2d');

    for (const layerConfig of config.layers) {
        const imagePath = path.join(__dirname, '..', 'layers', layerConfig.folder, layerConfig.filename);
        const image = await loadImage(imagePath);
        ctx.drawImage(image, 0, 0, config.width, config.height);
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
}

module.exports.generateImage = generateImage;
