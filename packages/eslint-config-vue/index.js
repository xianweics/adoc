module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: true
  },
  extends: [
    'standard',
    'plugin:json/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'vue/multiline-html-element-content-newline': 2,
    'vue/no-v-model-argument': 0
  }
};
