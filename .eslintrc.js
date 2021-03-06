const { eslint, deepmerge } = require('@ice/spec');

module.exports = deepmerge(eslint, {
  rules: {
    "global-require": 0,
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "react-hooks/exhaustive-deps": 0,
  },
});
