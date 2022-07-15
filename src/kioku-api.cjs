const fs = require('fs');
const uuid = require('uuid');

const createCard = (card) => {
	if (!fs.existsSync('kioku-default.json')) {
		fs.writeFileSync('kioku-default.json', JSON.stringify([]));
	}

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

const api = {
	createCard,
};

module.exports = api;
