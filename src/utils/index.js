'use strict';

var Core = require('../core');

Core.Modular(module.exports)
  .assign(require('./array'))
  .assign(require('./string'));

/*
Core.extend(
  module.exports,
  require('./array'),
  require('./string')
);

Core.modular(module.exports)
  .assign(require('./array'))
  .assign(require('./string'));

Core.modular(module.exports)
  .assign(require('./array'))
  .assign(require('./string'))
  .regist();

Core.modular(module.exports)
  .assign(require('./array'), require('./string'));


Core.modular(module.exports)
  .assign(require('./array'), require('./string'));
*/