const createCard = require('./createCard.cjs');
const getAllCards = require('./getAllCards.cjs');
const getCard = require('./getCard.cjs');
const updateCard = require('./updateCard.cjs');
const deleteCard = require('./deleteCard.cjs');
const studyCard = require('./studyCard.cjs');
const syncDueCard = require('./syncDueCard.cjs');
const getStudyCards = require('./getStudyCards.cjs');

const api = {
	createCard,
	getAllCards,
	getCard,
	updateCard,
	deleteCard,
	studyCard,
	syncDueCard,
	getStudyCards,
};

module.exports = api;
