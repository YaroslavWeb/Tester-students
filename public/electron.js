const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu
const path = require("path")
const isDev = require("electron-is-dev")
const crypto = require('crypto')

let algorithm = 'aes-256-cbc'
let secret = '981127'
let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32)

const Datastore = require('nedb');
let db = {};
db.students = new Datastore({
    filename:'./students.db',
    autoload: true,
})

db.tests = new Datastore({
    filename:'./tests.db',
    autoload: true,
})

db.teachers = new Datastore({
    filename:'./teachers.db',
    autoload: true,
    afterSerialization(plaintext) {
        const iv = crypto.randomBytes(16)
        const aes = crypto.createCipheriv(algorithm, key, iv)
        let ciphertext = aes.update(plaintext)
        ciphertext = Buffer.concat([iv, ciphertext, aes.final()])
        return ciphertext.toString('base64')
    },
    beforeDeserialization(ciphertext) {
        const ciphertextBytes = Buffer.from(ciphertext, 'base64')
        const iv = ciphertextBytes.slice(0, 16)
        const data = ciphertextBytes.slice(16)
        const aes = crypto.createDecipheriv(algorithm, key, iv)
        let plaintextBytes = Buffer.from(aes.update(data))
        plaintextBytes = Buffer.concat([plaintextBytes, aes.final()])
        return plaintextBytes.toString()
    },
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
            nativeWindowOpen:true,
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
