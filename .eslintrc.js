const path = require('path');

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "mocha": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-restricted-syntax": [
      'error',
      'ForInStatement',
//      'ForOfStatement', For async/await loops
      'LabeledStatement',
      'WithStatement',
    ],
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "arrow-parens": ["off"],
    "consistent-return": "off",
    "comma-dangle": "off",
    "generator-star-spacing": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": ["error", { "ignore": ["electron"] }],
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    "promise/param-names": 2,
    "promise/always-return": 2,
    "promise/catch-or-return": 2,
    "promise/no-native": 0,
    "react/jsx-no-bind": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": "off",
    "react/forbid-prop-types": "off",
    "flowtype-errors/show-errors": 0, // TODO
    "space-before-function-paren": ["error", "always"],
    "jsx-a11y/no-static-element-interactions": 0
  },
  "plugins": [
    "flowtype-errors",
    "import",
    "promise",
    "react"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, "webpack.config.eslint.js")
      }
    }
  }
}
