module.exports = {
  "extends": ["standard", "eslint:recommended"],
  "plugins": [
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