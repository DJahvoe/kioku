const fs = require('fs');
const init = require('./util/init.cjs');

const deleteCard = (id) => {
	init();

	const cards = JSON.parse(fs.readFileSync('kioku-default.json'));
	const index = cards.findIndex((c) => c.id === id);
	cards.splice(index, 1);

	fs.writeFileSync('kioku-default.json', JSON.stringify(cards));
	return true;
};

module.exports = deleteCard;
