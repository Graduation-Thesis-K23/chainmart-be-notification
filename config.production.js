module.exports = {
  build: {
    templates: {
      destination: {
        path: '../src/email/templates',
        extension: 'hbs',
      },
    },
  },
  inlineCSS: true,
  removeUnusedCSS: true,
};
