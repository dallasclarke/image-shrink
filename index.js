const { app, BrowserWindow, Menu, globalShortcut } = require("electron");

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isMac = process.platform === "darwin" ? true : false;

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Image Shrink",
    width: 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    backgroundColor: "#fff",
    webPreferences: {
      nativeWindowOpen: true,
    },
  });

  mainWindow.loadFile("./app/index.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  globalShortcut.register(isMac ? "Command+Alt+I" : "Ctrl+Shift+I", () => mainWindow.toggleDevTools());

  mainWindow.on("closed", () => (mainWindow = null));
});

const menu = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: "CmdOrCtrl+W",
        click: () => app.quit(),
      },
    ],
  },
];

if (isMac) {
  menu.unshift({ role: "appMenu" });
}

app.on("window-all-closed", () => {
  if (isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
