const { app, BrowserWindow, session, dialog } = require('electron');

app.on('ready', () => {
  const path = require('path');
  const iconPath = path.join(__dirname, 'icon.png');

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });

  
  mainWindow.setIcon(iconPath);
  mainWindow.setMenu(null);

  // Load the website
  mainWindow.loadURL('https://latex.tr3x.xyz');

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    // Handle the error when the URL fails to load
    const errorMessage = `Failed to load ${validatedURL}\nError code: ${errorCode}\nDescription: ${errorDescription}`;
    showDialog('Failed to connect to the Server', errorMessage);
  });

  mainWindow.webContents.on('page-title-updated', (event, title) => {
    // Check if the title is the default title (usually the website title)
    if (title !== 'Untitled') {
      // Set the window title to your custom title
      mainWindow.setTitle('tr3x-LaTeX Editor');
    }
  });
});

function showDialog(title, message) {
  const options = {
    type: 'error',
    title: title,
    message: message,
    buttons: ['OK'],
  };

  dialog.showMessageBox(null, options, (response) => {
    // Handle the dialog response
    if (response === 0) {
      // User clicked the 'OK' button, quit the app
      app.quit();
    }
  });
}
