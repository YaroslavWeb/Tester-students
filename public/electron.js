const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu
const path = require("path");
const isDev = require("electron-is-dev");

const Datastore = require('nedb');
let db = {};
db.students = new Datastore({
    filename:'./students.db',
    autoload: true
})

db.tests = new Datastore({
    filename:'./tests.db',
    autoload: true
})

global.database = db;

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1080,
        height: 960,
        minWidth: 1080,
        minHeight: 960,
        show: false,
        icon: "",
        webPreferences: {
            plugins:true,
            webSecurity:false,
            nodeIntegration: true,
            webviewTag:true,
        }
    });
    win.webContents.openDevTools()
    Menu.setApplicationMenu(null);
    
    win.loadURL(
        isDev ?
        "http://localhost:3000" :
        `file://${path.join(__dirname, "../build/index.html")}`
    );
    win.on("closed", () => (win = null));

    win.once('ready-to-show', () => {
        win.show()
    })
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});
