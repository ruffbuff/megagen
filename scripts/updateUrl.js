// scripts/updateUrl.js
const fs = require('fs');
const path = require('path');

function replaceImageBaseUrl(newBaseUrl) {
    const baseMetadataPath = path.join('mdata', 'gen0');

    if (!fs.existsSync(baseMetadataPath)) {
        console.log("Metadata directory does not exist.");
        return;
    }

    const metadataFiles = fs.readdirSync(baseMetadataPath);

    metadataFiles.forEach(file => {
        if (file.endsWith('.json')) {
            const metadataPath = path.join(baseMetadataPath, file);
            const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
            const imageName = path.basename(metadata.image);
            metadata.image = newBaseUrl.endsWith('/') ? newBaseUrl + imageName : newBaseUrl + '/' + imageName;
            fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        }
    });

    console.log(`Image URLs updated to new base URL: ${newBaseUrl}`);
}

module.exports = { replaceImageBaseUrl };