Package.describe({
  name: 'abate:email-forms',
  version: '0.0.1',
  summary: 'Define email templates to be used with the package email',
  git: '',
  documentation: 'README.md',
})

Package.onUse((api) => {
  api.versionsFrom('1.6')

  api.use(
    [
      'mongo',
      'ecmascript',
      'tmeasday:check-npm-versions',
      'mdg:validated-method',
      'aldeed:collection2@3.0.0',
      'aldeed:autoform@6.3.0',
      'check',
      'underscore',
      'aldeed:autoform-select2',
      'spacebars-compiler',
      'universe:i18n',
      'universe:i18n-blaze',
      'abate:autoform-components',
    ],
    ['client', 'server'],
  )

  api.use([
    'templating',
    'natestrauser:select2@4.0.3',
  ], 'client')
  // api.use('markdown', ['client','server'],{weak: true});

  api.add_files([
    'server/publications.js',
    'server/init.js',
  ], 'server')
  api.add_files(
    [
      'both/collection.js',
      'both/helpers.js',
      'both/methods.js'],
    ['client', 'server'],
  )
  api.add_files(
    ['client/email-forms.html',
      'client/email-forms.js'],
    'client',
  )

  api.add_files(['i18n/en.i18n.json'], ['client', 'server'])
})

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('email-forms');
//   api.mainModule('email-forms-tests.js');
// });
