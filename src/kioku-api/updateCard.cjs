const fs = require('fs');
const init = require('./util/init.cjs');

const updateCard = (id, card) => {
	init();

	const cards = JSON.parse(fs.readFileSync('kioku-default.json'));
	const index = cards.findIndex((c) => c.id === id);
	cards[index] = {
		...cards[index],
		...card,
		updatedAt: new Date(),
	};

	fs.writeFileSync('kioku-default.json', JSON.stringify(cards));
	return true;
};

module.exports = updateCard;
