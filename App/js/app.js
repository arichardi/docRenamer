const REGEX = /[\\][A-Za-z0-9]+[.][a-z]{3}/gm

const folderButton = document.querySelector('#folder-btn')
const elementQty = document.querySelector('.numberElements')
const dirAddress = document.querySelector('.directory')
const renameButton = document.querySelector('#rename')
const sulfixField = document.querySelector('#sulfix')
const prefixField = document.querySelector('#prefix')

class FilesList {
    constructor(filePath){
        this.filePath = filePath;
        this.size = filePath.length;
    }
    getPath(position) {
        return this.filePath[position]
    }
    getFileName(position) {
        return this.getPath(position).match(REGEX)
    }
    filesDirectory(){
        return this.filePath[0].replace( this.getFileName(0), '')
    }

}

let selectedFiles = [];

folderButton.addEventListener('click', async () => {
    const {filePaths} = await window.systemApi.selectFiles();

    const selectedFiles = new FilesList(filePaths)
    elementQty.innerText = selectedFiles.size
    dirAddress.innerText = selectedFiles.filesDirectory()

    console.log('Files successfully loaded'); 
})


renameButton.addEventListener('click', () => {
    const oldName = "entrada"
    const newName = "saida"
    window.systemApi.renameFiles(oldName, newName)
})
