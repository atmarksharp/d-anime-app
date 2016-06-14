const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {globalShortcut} = electron;

// let loadOpt = { userAgent: "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"};
let win;
let winId = 0;

function getZoomFactor(_win){
  if ( typeof _win.__zoomFactor == "undefined" ) {
    _win['__zoomFactor'] = 1.0;
  }

  return _win.__zoomFactor;
}

function setZoomFactor(_win, value){
  if ( typeof _win.__zoomFactor == "undefined" ) {
    _win['__zoomFactor'] = 1.0;
  }

  _win['__zoomFactor'] = value;
}

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      plugins: true
    }
  });

  win.loadURL('https://anime.dmkt-sp.jp/animestore/mp_viw_pc');

  win.on('closed', () => {
    win = null;
  });

  win.on('app-command', (e, cmd) => {
    win.webContents.goBack();
  });
}

app.commandLine.appendSwitch('widevine-cdm-path', `${__dirname}/widevinecdmadapter.plugin`);
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866');



app.on('ready', () => {

  function applyZoom(value, absolute = false){
    let zoom = getZoomFactor(win);
    if(absolute === true){
      zoom = 1.0;
    }

    setZoomFactor(win, zoom * value);
    win.webContents.insertCSS(`body { transform-origin: left top; transform: scale(${zoom * value}) }`);
  }

  globalShortcut.register('CmdOrCtrl+-', () => {
    applyZoom(0.8);
  });

  globalShortcut.register('CmdOrCtrl+Plus', () => {
    applyZoom(1.25);
  });

  globalShortcut.register('CmdOrCtrl+=', () => {
    applyZoom(1.25);
  });

  globalShortcut.register('CmdOrCtrl+0', () => {
    applyZoom(1.0, true);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('browser-window-created', (e, _win) => {
  win = _win;
});

app.on('browser-window-focus', (e, _win) => {
  win = _win;
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
