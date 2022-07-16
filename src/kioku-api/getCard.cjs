const fs = require('fs');
const init = require('./util/init.cjs');

const getCard = (id) => {
	init();

	const cards = JSON.parse(fs.readFileSync('kioku-default.json'));
	return cards.find((card) => card.id === id);
};

module.exports = getCard;
