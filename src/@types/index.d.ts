interface Card {
	id?: string;
	frontFace: string;
	backFace: string;
	repetitionNumber: number;
	easinessFactor: number;
	intervalInDays: number;
	dueTimestamp: Date;
	status: 'new' | 'learning' | 'review' | 'mastered';
	createdAt?: Date;
	updatedAt?: Date;
}

interface PayloadRespond {
	statusCode: number;
	message: string;
}

interface KiokuAPI {
	init: () => void;
	createCard: (card: Card) => Card;
	getAllCard: () => Card[];
	getCard: (id: string) => Card;
	updateCard: (id: string, updatedCard: Partial<Card>) => Card;
	deleteCard: (id: string) => Card;
}