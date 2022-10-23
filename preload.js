const path = require('path')
const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args)
});

contextBridge.exposeInMainWorld('systemApi', {
    selectFiles: () => ipcRenderer.invoke('fileSelect'),
    renameFiles: (oldName, newName) => ipcRenderer.invoke('fileRename', oldName, newName)
})
