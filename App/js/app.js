const folderButton = document.querySelector('#folder-btn')
const elementQty = document.querySelector('.numberElements')
const dirAddress = document.querySelector('.directory')
const renameButton = document.querySelector('#rename')
const sulfixField = document.querySelector('#sulfix')
const prefixField = document.querySelector('#prefix')


folderButton.addEventListener('click', async () => {
    const filesSelected = await window.systemApi.selectFiles();

    elementQty.innerText = filesSelected.filePaths.length;
    const fullAdressFirstFile = filesSelected.filePaths[0];
    const regEx = /[\\][A-Za-z0-9]+[.][a-z]{3}/gm;
    const firstFileSelected = fullAdressFirstFile.match(regEx)
    const directory = fullAdressFirstFile.replace(firstFileSelected, '')
    dirAddress.innerText = directory

    console.log('Files successfully loaded');
})


renameButton.addEventListener('click', () => {

})
