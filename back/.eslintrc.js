module.exports = {
  ignorePatterns: ["node_modules/", "dist/", "index.js"],
  env: {
    browser: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    eqeqeq: ["error", "smart"],
  },
};
