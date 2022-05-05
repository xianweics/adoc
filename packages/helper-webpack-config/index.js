const rules = require('./rules');
const plugins = require('./plugins');
const main = (opt) => {
  return {
    module: {
      rules: rules(opt)
    },
    plugins: plugins(opt)
  };
};
module.exports = main;
