module.exports = {
  "extends": ["standard", "plugin:react/recommended"],
  "plugins": [
    "react",
    "standard",
    "promise"
  ],
  "rules": {
    "no-return-assign": "off"
  },
  "root": true,
  "env": {
    browser: true,
    es6: true
  },
  "parser": "babel-eslint"
};