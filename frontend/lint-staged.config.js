module.exports = {
  "*.{js,jsx,ts,tsx}": ["npm run lint", "npm run format"],
  "**/*.ts?(x)": () => "npm run check-types",
  "*.{js,jsx,ts,tsx,json,css,md}": ["npm run format"],
};
