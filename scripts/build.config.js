const fs = require('fs');

(function updateNgswVersion() {
  fs.readFile('ngsw-config.json', 'utf-8', (err, _config) => {
    if (err) {
      throw err;
    }
    let config = JSON.parse(_config.toString());
    config.version++;
    fs.writeFile('ngsw-config.json', JSON.stringify(config), (e) => {
      if (e) {
        throw e;
      }
      console.log('New version of Service worker detected : ' + config.version);
    });
  });
})();
