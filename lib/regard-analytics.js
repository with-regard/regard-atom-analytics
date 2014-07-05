regard = require('regard-js-client');

var _viewNameForPaneItem = function(item) {
  var extension, itemPath, name, _ref;
  name = (_ref = typeof item.getViewClass === "function" ? item.getViewClass().name : void 0) != null ? _ref : item.constructor.name;
  if (name !== 'EditorView') {
    return name;
  }
  itemPath = typeof item.getPath === "function" ? item.getPath() : void 0;
  if (path.dirname(itemPath) !== atom.getConfigDirPath()) {
    return name;
  }
  extension = path.extname(itemPath);
  switch (path.basename(itemPath, extension)) {
    case 'config':
      if (extension === '.json' || extension === '.cson') {
        name = 'UserConfig';
      }
      break;
    case 'init':
      if (extension === '.js' || extension === '.coffee') {
        name = 'UserInitScript';
      }
      break;
    case 'keymap':
      if (extension === '.json' || extension === '.cson') {
        name = 'UserKeymap';
      }
      break;
    case 'snippets':
      if (extension === '.json' || extension === '.cson') {
        name = 'UserSnippets';
      }
      break;
    case 'styles':
      if (extension === '.css' || extension === '.less') {
        name = 'UserStylesheet';
      }
  }
  return name;
};

module.exports = {
  activate: function() {
    regard.setOrganization('github');
    regard.setProduct('atom');
    regard.setDefaultProperties({'atom.version': atom.getVersion()});
    this.sessionStart = Date.now();

    atom.workspaceView.command('regard-analytics:my-data', this.showMyData);
    this.begin();
  },
  deactivate: function(){
    regard.trackEvent('session.new', {'session.length' : Date.now() - this.sessionStart});
  },
  showMyData: function() {
    console.log(regard.getUserId());
  },
  begin: function(){

    atom.workspaceView.on('pane:item-added', function(event, item) {
        regard.trackEvent('item.load', {'item.name' : _viewNameForPaneItem(item)});
    });

    if (atom.getLoadSettings().shellLoadTime) {
      regard.trackEvent('shell.load', {'shell.load-time': atom.getLoadSettings().shellLoadTime});
    }
    process.nextTick(function(){
      regard.trackEvent('core.load', { 'core.load-time' : atom.getWindowLoadTime()});
    });
  }
};
