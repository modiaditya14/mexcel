const fs = require("fs")
const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron')
const path = require('path')
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        // webPreferences: {
        //     preload: path.join(__dirname, 'preload.js')
        // },
        icon: "icon.ico",
        titleBarStyle: "default",
        darkTheme: true,

    })


    win.loadFile('nodex/index.html')

    const isMac = process.platform === 'darwin'
    const template = [
        ...(isMac ? [{
            label: app.name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }] : []),
        {
            label: 'File',
            submenu: [
                isMac ? { role: 'close', accelerator: 'Alt+F4' } : { role: 'quit', accelerator: 'Alt+F4' },
                {
                    label: "Save to File", click: function () {
                        let content
                        const { dialog } = require('electron')
                        win.webContents.executeJavaScript(`JSON.stringify(valCells)`, true)
                            .then(json => content = json)
                            .catch((e) => console.log(e))
                        dialog.showSaveDialog({
                            defaultPath: "Book1",
                            filters: [{
                                name: 'Excel Worksheet',
                                extensions: ['json']
                            }],

                        }).then((fileName) => {
                            fs.writeFileSync(`${fileName.filePath}.json`, content)
                        })
                    }
                },
                {
                    label: "Clear cache", click: function () {
                        win.webContents.executeJavaScript(`localStorage.setItem("vals","")`, true)
                            .then()
                            .catch((e) => console.log(e))
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startSpeaking' },
                            { role: 'stopSpeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                ...(isMac ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal(`https://github.com/modiaditya14/webexecl`)
                    }
                }
            ]
        }
    ]


    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    nativeTheme.themeSource = 'dark'
}
app.disableHardwareAcceleration()

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})