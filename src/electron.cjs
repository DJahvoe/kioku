const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, ipcMain } = require('electron');
const serve = require('electron-serve');
const path = require('path');
const api = require('./kioku-api/index.cjs');

try {
	require('electron-reloader')(module, { ignore: /(.*).json/g });
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: 'whitesmoke',
		// titleBarStyle: 'hidden',
		icon: './KiokuLogo.ico',
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
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Kioku',
		},
	],
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.once('ready', () => {
	createMainWindow();
	api.syncDueCard();
});
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
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
	if (payload.data.id) {
		cards = api.getCard(payload.data.id);
	} else if (payload.data.studyMode) {
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
