const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, ipcMain, Tray, globalShortcut } = require('electron');
const nativeImage = require('electron').nativeImage;
const serve = require('electron-serve');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
// const api = require('./kioku-api/index.cjs');
const { Menu } = require('electron/main');

try {
	require('electron-reloader')(module, { ignore: /(.*).json/g });
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;
let mainWindow;
let modalWindow;
let isQuitting = false;
let windowState;
let icon;

// KIOKU API
const init = () => {
	if (!fs.existsSync('kioku-default.json')) {
		fs.writeFileSync('kioku-default.json', JSON.stringify([]));
	}
};

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

const deleteCard = (id) => {
	init();

	const cards = JSON.parse(fs.readFileSync('kioku-default.json'));
	const index = cards.findIndex((c) => c.id === id);
	cards.splice(index, 1);

	fs.writeFileSync('kioku-default.json', JSON.stringify(cards));
	return true;
};

const getAllCards = () => {
	init();

	return JSON.parse(fs.readFileSync('kioku-default.json'));
};

const getCard = (id) => {
	init();

	const cards = JSON.parse(fs.readFileSync('kioku-default.json'));
	return cards.find((card) => card.id === id);
};

const getStudyCards = () => {
	const cards = getAllCards();
	const dueCards = cards.filter((card) => card.status === 'due');
	const newCards = cards.filter((card) => card.status === 'new');
	const learningCards = cards.filter((card) => card.status === 'learning');
	return [...dueCards, ...newCards, ...learningCards];
};

const studyCard = (id, quality) => {
	init();

	const card = getCard(id);
	if (quality >= 3) {
		if (card.repetitionNumber === 1 || quality === 5) {
			card.intervalInDays = 4;
			card.status = 'seen';
		} else if (card.repetitionNumber === 0) {
			card.intervalInDays = 1;
			card.status = 'learning';
		} else {
			card.intervalInDays = Math.round(card.intervalInDays * card.easinessFactor);
		}
		card.repetitionNumber++;
	} else {
		card.repetitionNumber = 0;
		card.intervalInDays = 1;
	}

	card.dueTimestamp = new Date(new Date().getTime() + card.intervalInDays * 24 * 60 * 60 * 1000);
	card.easinessFactor =
		card.easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
	if (card.easinessFactor < 1.3) {
		card.easinessFactor = 1.3;
	}

	updateCard(id, card);
};

const syncDueCard = () => {
	console.log('SYNC!');
	const cards = getAllCards();
	const newCards = cards.map((card) => {
		const due = new Date(card.dueTimestamp);
		const now = new Date();
		if (due <= now && card.status === 'seen') {
			card.status = 'due';
		}
		return card;
	});
	fs.writeFileSync('kioku-default.json', JSON.stringify(newCards));
	return newCards;
};

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

// ELECTRON
function createWindow() {
	const mainWindow = new BrowserWindow({
		backgroundColor: '#0F172A',
		// titleBarStyle: 'hidden',
		icon: icon,
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		minHeight: 450,
		minWidth: 500,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: true,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		// x: windowState.x,
		// y: windowState.y,
		width: 1000,
		height: 800,
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', (event) => {
		if (!isQuitting) {
			event.preventDefault();
			mainWindow.hide();
		}

		return false;
	});

	mainWindow.on('minimize', (event) => {
		event.preventDefault();
		mainWindow.hide();
	});

	return mainWindow;
}

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function loadViteModal(port) {
	modalWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadViteModal(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	// mainWindow.once('close', () => {
	// 	mainWindow = null;
	// });

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

function createModalWindow() {
	modalWindow = new BrowserWindow({
		show: false,
		parent: mainWindow,
		backgroundColor: '#0F172A',
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		icon: icon,
		modal: true,
		width: 400,
		height: 250,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			preload: path.join(__dirname, 'preload.cjs'),
		},
	});

	modalWindow.on('close', (event) => {
		event.preventDefault();
		modalWindow.hide();
		return false;
	});
	modalWindow.on('minimize', (event) => {
		event.preventDefault();
		modalWindow.hide();
	});
	modalWindow.on('show', () => {
		setTimeout(() => {
			modalWindow.focus();
		}, 200);
	});

	windowState.manage(modalWindow);

	globalShortcut.register('Alt+CommandOrControl+K', () => {
		modalWindow.show();
		modalWindow.focus();

		modalWindow.webContents.send('ELECTRON-MODAL');
	});

	if (dev) loadViteModal(port);
	else serveURL(modalWindow);
}

app.whenReady().then(() => {
	windowState = windowStateManager({
		defaultWidth: 1000,
		defaultHeight: 800,
	});

	icon = nativeImage.createFromPath(path.join(__dirname, 'KiokuLogo.ico'));

	createMainWindow();
	createModalWindow();

	const tray = new Tray(icon);

	tray.setContextMenu(
		Menu.buildFromTemplate([
			{
				label: 'Show App',
				click: () => {
					mainWindow.show();
				},
			},
			{
				label: 'Quit',
				click: () => {
					isQuitting = true;
					console.log('QUITTING');
					app.quit();
				},
			},
		]),
	);

	api.syncDueCard();
});

app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});

app.on('window-all-closed', () => {
	console.log('WINDOW ALL CLOSED');
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('SVELTE-ADD', (event, payload) => {
	api.createCard(payload.data);
	return mainWindow.webContents.send('ELECTRON-ADD', {
		statusCode: 200,
		message: 'Card succesfully added!',
		data: {},
	});
});

ipcMain.on('SVELTE-GET', (event, payload) => {
	let cards;
	if (payload?.data?.id) {
		cards = api.getCard(payload.data.id);
	} else if (payload?.data?.studyMode) {
		cards = api.getStudyCards();
	} else {
		cards = api.getAllCards();
	}
	return mainWindow.webContents.send('ELECTRON-GET', {
		statusCode: 200,
		message: 'Cards succesfully retrieved!',
		data: cards,
	});
});

ipcMain.on('SVELTE-STUDY', (event, payload) => {
	api.studyCard(payload.data.id, payload.data.quality);
});

ipcMain.on('SVELTE-CLOSEMODAL', (event, payload) => {
	modalWindow.hide();
});
