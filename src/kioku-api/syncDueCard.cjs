const getAllCards = require('./getAllCards.cjs');

const syncDueCard = () => {
	const cards = getAllCards();
	const newCards = cards.map((card) => {
		if (card.dueTimestamp <= new Date() && card.status === 'seen') {
			card.status = 'due';
		}
		return card;
	});
	return newCards;
};

module.exports = syncDueCard;
