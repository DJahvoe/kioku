const fs = require('fs');
const init = require('./util/init.cjs');

const getAllCards = () => {
	init();

	return JSON.parse(fs.readFileSync('kioku-default.json'));
};


module.exports = getAllCards;