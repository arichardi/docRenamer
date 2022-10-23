const { app, BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path')

process.env.NODE_ENV = 'devlopment';

const IS_DEV = process.env.NODE_ENV !== 'development';

//The app main window creation
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'docRenamer',
        width: IS_DEV ? 1300: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, './preload.js')
        }
    })

    if(IS_DEV){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './App/index.html'));
}

app.whenReady().then( () => {
    ipcMain.handle('fileSelect', filesSelectionHandler)
    createMainWindow();
})

//executable Functions
async function filesSelectionHandler(){
    const response = dialog.showOpenDialog({ properties: [ 'openFile', 'multiSelections']});
    if( response.canceled ){
        return
    }
    return response;

};



