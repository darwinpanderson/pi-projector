// Required package modules and instantiation
var moment = require('moment')
var chartio = require('./chartio')
const {app, BrowserWindow, WebContents} = require('electron')

let mainWindow
let charts = [167167,90080]
let config = {
  "debug"       : false,
  "chartSpeed"  : 60000
}

function createWindow (url) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //fullscreen: true,
    backgroundColor: '#FFFFFF',
    show: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
  })

  chartQueue()
}

app.on('ready', function(){
  url = chartio.url(167167)
  createWindow(url)
})

app.on('window-all-closed', function () {
    app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

function chartQueue(){
  for (var i = 0; i < charts.length+1; i++) {
    (function (i) {
      if (i < charts.length) {
        setTimeout(function () {
          url = chartio.url(charts[i])
          if (config.debug) {console.log("Loading url: " + url);}
          mainWindow.loadURL(url)
        }, config.chartSpeed*i);
      } else {
        setTimeout(function () {
          if (config.debug) {console.log("Reloading charts");}
          chartQueue()
        }, config.chartSpeed*i);
      }
    })(i);
  };
}
