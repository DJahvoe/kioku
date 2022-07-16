const init = require('./util/init.cjs');
const getCard = require('./getCard.cjs');
const updateCard = require('./updateCard.cjs');

const studyCard = (id, quality) => {
	init();

	const card = getCard(id);
	if (quality >= 3) {
		if (card.repetitionNumber === 0) {
			card.intervalInDays = 1;
			card.status = 'learning';
		} else if (card.repetitionNumber === 1) {
			card.intervalInDays = 4;
			card.status = 'seen';
		} else {
			card.intervalInDays = Math.round(card.intervalInDays * card.easinessFactor);
		}
		card.repetitionNumber++;
	} else {
		card.repetitionNumber = 0;
		card.intervalInDays = 1;
	}

	card.dueTimestamp = new Date(new Date().getTime() + card.intervalInDays * 24 * 60 * 60 * 1000);
    card.easinessFactor = card.easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
	if (card.easinessFactor < 1.3) {
		card.easinessFactor = 1.3;
	}

	updateCard(id, card);
};

module.exports = studyCard;