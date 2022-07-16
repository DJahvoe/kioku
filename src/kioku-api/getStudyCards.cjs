const getAllCards = require('./getAllCards.cjs');

const getStudyCards = () => {
	const cards = getAllCards();
	const dueCards = cards.filter((card) => card.status === 'due');
	const newCards = cards.filter((card) => card.status === 'new');
	const learningCards = cards.filter((card) => card.status === 'learning');
	return [...dueCards, ...newCards, ...learningCards];
};

module.exports = getStudyCards;
