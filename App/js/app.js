const REGEX = /[A-Za-z0-9\u00C0-\u00FF]+_?[0-9]{0,2}?[.][a-z]{3}/gm;
const REGEX_TYPE = /[.][a-zA-Z]{3}?/;
const folderButton = document.querySelector('#folder-btn');
const elementQty = document.querySelector('.numberElements');
const dirAddress = document.querySelector('.directory');
const renameButton = document.querySelector('#rename');
const sulfixField = document.querySelector('#sulfixField');
const prefixField = document.querySelector('#prefixField');
const keepNameField = document.querySelector("#KeepNameField");
const prefixCKB = document.querySelector("#prefix");
const keepNameCKB = document.querySelector("#KeepName");
const sulfixCKB = document.querySelector("#sulfix");
const namePreview = document.querySelector('.namePreview')

class FilesList {
    constructor(filePath){
        this.filePath = filePath;
        this.size = filePath.length;
    }
    getPath(position) {
        return this.filePath[position]
    }
    getFileName(position) {
        const filefullName = this.getPath(position).match(REGEX)
        const shortName = filefullName[0].replace(this.getFileType(position), '')
        return shortName
    }
    filesDirectory(){
        return this.filePath[0].replace( `${this.getFileName(0)}${this.getFileType(0)}`, '')
    }
    getFileType(position){
        return this.getPath(position).match(REGEX_TYPE)
    }

}

let selectedFiles = [];

folderButton.addEventListener('click', async () => {
    const {filePaths} = await window.systemApi.selectFiles();

    selectedFiles = new FilesList(filePaths)
    elementQty.innerText = selectedFiles.size
    dirAddress.innerText = selectedFiles.filesDirectory()

    console.log('Files successfully loaded'); 
})


renameButton.addEventListener('click', () => {
    if(!selectedFiles.size){
        console.log('Please chose the files to be changed')
        return
    }
    
    selectedFiles.filePath.forEach( (element, index) => {
        const oldName = selectedFiles.getPath(index)
        const newName = [selectedFiles.filesDirectory() ,prefixField.value, selectedFiles.getFileName(index), sulfixField.value, selectedFiles.getFileType(index)].join('')
        window.systemApi.renameFiles(oldName, newName)
        
    })
    console.log("files updated with success")
})



prefixCKB.addEventListener('change', () => {
    if(prefixCKB.checked){
        prefixField.disabled = false;
    }else{
        prefixField.disabled = true;
    }
})
keepNameCKB.checked = true
keepNameCKB.addEventListener('change', () => {
    if(keepNameCKB.checked){
        keepNameField.disabled = true;
    }else{
        keepNameField.disabled = false;
    }
})
sulfixCKB.addEventListener('change', () => {
    if(sulfixCKB.checked){
        sulfixField.disabled = false;
    }else{
        sulfixField.disabled = true;
    }
})


