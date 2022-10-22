const { app, BrowserWindow} = require('electron');
const path = require('path')

process.env.NODE_ENV = 'devlopment';

const IS_DEV = process.env.NODE_ENV !== 'development';

//The app main window creation
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'docRenamer',
        width: IS_DEV ? 1300: 800,
        height: 600,
    })

    if(IS_DEV){
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './App/index.html'));
}

app.whenReady().then( () => {
    createMainWindow();
})

