
const yaml = async ( short ) => {

    const yaml = require('js-yaml');
    const fs   = require('fs');

    try {
        var urls = await yaml.load(fs.readFileSync(`${__dirname}/../../urls.yaml`, 'utf8'));
        return urls[short]
    } catch (e) {
        console.error('could not load urls.yaml');
        console.error(e);
        return false
    }

}

const firestore = async ( short ) => {
    
    // TODO
    
}

module.exports = { yaml, firestore }