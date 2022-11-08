<div align="center">
  <br>
  <img alt="DocRenamer logo" src="https://github.com/arichardi/docRenamer/blob/main/App/files/Logo_blue.svg" width="300px">
  <h1> 📁 The easiest way to rename your files 📁</h1>
<br>

  <a href="https://www.electronjs.org/">
    <img src="https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=9FEAF9" alt="Electron">
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript">
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="Windows">
  </a>
  <a href="https://github.com/arichardi/docRenamer">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VSCode">
  </a>

</div>



# DocRenamer 

DocRenamer is an easy-to-use windows program made in Electron to rename a large collection of files.
On my daily basis it's really common the necessity to rename a large collection of files, to adequate to a specific version, or
with a specific prefix. With this in mind, I designed a simple and beautiful app to help.

🔽 If you want to download the exec files you can do it through this [link](https://www.mediafire.com/file/yvv3qdngi4imuh0/docRenamer-win32-x64.rar/file)

<br>
<div align="center">

 <img src="https://github.com/arichardi/docRenamer/blob/main/App/files/Image_app.jpg" alt="DocRename screenshot" width="500">

</div>

# 🚀 Pre-requisites and Install

You need to have pre-installed the nodeJS 16+, and that's all.
To install the code, you only need to copy the project to a folder and install the dependencies


```bash
npm install
```
# 🏃 running

To run the program, I recommend changing the mainJS process.env to development, and run the
program in devmode. It will execute the packages with electromon updating automatically any changes
and the program will open with inspect mode already in mind

In main.js -> line 6
```Javascript

process.env.NODE_ENV = 'development';

const IS_DEV = process.env.NODE_ENV !== 'production';

```
running the program

```bash
npm run devmode
```
# 🤖Structure

If you are like me, whom has the habit of looking in the others project to understand or imporving your own projects,
understanding how I organize my files could be a great help

The project has 3 main files

    main.js

This is the entry file. It's responsible for creating windows and the menu, and it executes some functions
using an node Api that app.js (responsible for the view) file can't us

    preload.js

Preload will make the bridge between the call made by the app.js (view responsable) and the main.js 

    app.js

File responsible for the buttons clicks and other things related to the view

# 🧰 build 

The process of building was made using the electron-forge.

To generate a new build, change the main.js file back to production and run the make comand
It will generate all the files in a out folder, recently created.


```bash
npm make
```

# 🌱Licensing

MIT ©DocRenamer.

