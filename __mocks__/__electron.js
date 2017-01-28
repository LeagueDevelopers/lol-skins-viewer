const electron = jest.genMockFromModule('electron');

electron.screen = {};

const primaryDisplay = {
  workAreaSize: {
    width: 1920
  }
};

electron.screen.setPrimaryDisplayWidth = width => {
  primaryDisplay.workAreaSize.width = width;
};

electron.screen.getPrimaryDisplay = () => primaryDisplay;

module.exports = electron;
