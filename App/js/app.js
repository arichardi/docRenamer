//const REGEX = /[A-Za-z0-9\u00C0-\u00FF]+_?[0-9]{0,2}?[.][a-z]{3}/gm;
const REGEX = /[A-Z,a-z,0-9,_]+[.][a-z]{3,4}$/gm;
//const REGEX_TYPE = /[.][a-zA-Z]{3}?/;
const REGEX_TYPE = /[.][a-zA-Z]{3}$/gm;
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
let previewNewName = ["", "fileName", "", ""]

folderButton.addEventListener('click', async () => {
    const {filePaths} = await window.systemApi.selectFiles();

    selectedFiles = new FilesList(filePaths)
    elementQty.innerText = selectedFiles.size
    dirAddress.innerText = selectedFiles.filesDirectory()
    namePreview.innerText = previewNewName.join('')

    console.log('Files successfully loaded'); 
})


renameButton.addEventListener('click', () => {
    if(!selectedFiles.size){
        console.log('Please chose the files to be changed')
        return
    }
    
    selectedFiles.filePath.forEach( (element, index) => {
        const oldName = selectedFiles.getPath(index)
        let newName;
        if(keepNameCKB.checked){
            newName = [selectedFiles.filesDirectory() ,prefixField.value, selectedFiles.getFileName(index), sulfixField.value, selectedFiles.getFileType(index)]
            .join('')
        }else{
            newName = [selectedFiles.filesDirectory() ,prefixField.value, keepNameField.value, "_", index , sulfixField.value, selectedFiles.getFileType(index)]
            .join('')
        }

        window.systemApi.renameFiles(oldName, newName)
        
    })
    console.log("files updated with success")
})



prefixCKB.addEventListener('change', () => {
    if(prefixCKB.checked){
        prefixField.disabled = false;
        if(prefixField.value){
            previewNewName[0] = prefixField.value
            namePreview.innerText = previewNewName.join('')
        }
    }else{
        prefixField.disabled = true;
        previewNewName[0] = ''
        namePreview.innerText = previewNewName.join('')
    }
})

keepNameCKB.checked = true
keepNameCKB.addEventListener('change', () => {
    if(keepNameCKB.checked){
        keepNameField.disabled = true;
        previewNewName[1] = 'fileName'
        namePreview.innerText = previewNewName.join('')
    }else{
        keepNameField.disabled = false;
        if(keepNameField.value){
            previewNewName[1] = keepNameField.value
            namePreview.innerText = previewNewName.join('')
        }
    }
})

sulfixCKB.addEventListener('change', () => {
    if(sulfixCKB.checked){
        sulfixField.disabled = false;
        if(sulfixField.value){
            previewNewName[2] = sulfixField.value
            namePreview.innerText = previewNewName.join('')
        }
    }else{
        sulfixField.disabled = true;
        previewNewName[2] = ''
        namePreview.innerText = previewNewName.join('')
    }
})

prefixField.addEventListener("input", () => {
    previewNewName[0] = prefixField.value
    namePreview.innerText = previewNewName.join('')
})

keepNameField.addEventListener("input", () => {
    previewNewName[1] = keepNameField.value
    namePreview.innerText = previewNewName.join('')
})

sulfixField.addEventListener("input", () => {
    previewNewName[2] = sulfixField.value
    namePreview.innerText = previewNewName.join('')
})





