const { app, BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path')
const fs = require ('fs')

process.env.NODE_ENV = 'devlopment';

const IS_DEV = process.env.NODE_ENV !== 'development';

//The app main window creation
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'docRenamer',
        width: IS_DEV ? 1100: 600,
        height: 720,
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
    ipcMain.handle('fileRename', (event, oldName, newName) => {
        filesRenamer(oldName, newName)
    })
    createMainWindow();

    app.on('window-all-closed', () => {
        if(process.platform !== "darwin"){
            app.quit();
        }
    })

})

//executable Functions
async function filesSelectionHandler(){
    const response = dialog.showOpenDialog({ properties: [ 'openFile', 'multiSelections']});
    if( response.canceled ){
        return
    }
    return response;

};

function filesRenamer(oldName, newName){
    fs.rename(oldName, newName, (error) => {
        if(error){
            console.error(`An error occours during the files renaming:  ${error.message}`)
            return
        }
        console.log("Renamed successfully")
    })    
}

