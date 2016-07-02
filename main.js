const electron = require('electron');
const {app, BrowserWindow, globalShortcut} = electron;

let win = null;
let winId = 0;

app.commandLine.appendSwitch('widevine-cdm-path', `${app.getAppPath()}/widevinecdmadapter.plugin`);
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866');

function getZoomFactor(_win){
  if( _win === null ){
    return 1.0;
  }

  if ( typeof _win.__zoomFactor === "undefined" ) {
    _win['__zoomFactor'] = 1.0;
  }

  return _win.__zoomFactor;
}

function setZoomFactor(_win, value){
  if( _win === null ){
    return;
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
}

function registerShortcuts(){
  function registerShortcut(cmd,handler){
    if(globalShortcut.isRegistered(cmd) === false){
      globalShortcut.register(cmd, handler);
    }
  }

  registerShortcut('Backspace', () => {
    if(win.webContents.canGoBack()){
      win.webContents.goBack();
    }
  });

  registerShortcut('Shift+Backspace', () => {
    if(win.webContents.canGoForward()){
      win.webContents.goForward();
    }
  });

  registerShortcut('CmdOrCtrl+-', () => {
    applyZoom(0.8);
  });

  registerShortcut('CmdOrCtrl+Plus', () => {
    applyZoom(1.25);
  });

  registerShortcut('CmdOrCtrl+=', () => {
    applyZoom(1.25);
  });

  registerShortcut('CmdOrCtrl+0', () => {
    applyZoom(1.0, true);
  });
}

app.on('ready', () => {

  function applyZoom(value, absolute = false){
    let zoom = getZoomFactor(win);
    if(absolute === true){
      zoom = 1.0;
    }

    setZoomFactor(win, zoom * value);
    win.webContents.insertCSS(`body { transform-origin: left top; transform: scale(${zoom * value}) }`);
  }

  registerShortcuts();
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('browser-window-created', (e, _win) => {
  win = _win;
});

app.on('browser-window-focus', (e, _win) => {
  win = _win;
  registerShortcuts();
});

app.on('browser-window-blur', (e, _win) => {
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
