export default {
  '*.{js,jsx,ts,tsx,vue}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{css,scss,less,styl,html}': [
    'prettier --write',
  ],
  '*.{json,md}': [
    'prettier --write',
  ],
}; 