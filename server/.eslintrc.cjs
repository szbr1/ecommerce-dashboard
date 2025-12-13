import base from '../eslint.base.config.mjs';

export default [
  ...base,
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
];
