const fs = require('fs');
const uuid = require('uuid');
const init = require('./util/init.cjs');

const createCard = (card) => {
	init();

	const cards = JSON.parse(fs.readFileSync('kioku-default.json'));
	cards.push({
		...card,
		id: uuid.v4(),
		repetitionNumber: 0,
		easinessFactor: 2.5,
		intervalInDays: 1,
		dueTimestamp: new Date(),
		status: 'new',
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	fs.writeFileSync('kioku-default.json', JSON.stringify(cards));
};

module.exports = createCard;