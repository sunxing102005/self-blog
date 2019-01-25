module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["eslint:recommended"],
  plugins: ["html", "vue", "prettier", "import"],
  rules: {
    "no-console": "off",
    "prefer-const": "error",
    "prettier/prettier": "warn",
    "prefer-arrow-callback": "warn"
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    location: true,
    setTimeout: true,
    setInterval: true,
    clearInterval: true,
    sessionStorage: true,
    Promise: true,
    document: true,
    window: true,
    module: true,
    console: true,
    require: true,
    process: true,
    __dirname: true
  }
};
