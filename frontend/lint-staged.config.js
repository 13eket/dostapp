module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.{js,jsx,ts,tsx,json,css,md}': ['prettier --write'],
};
