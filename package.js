Package.describe({
  name: 'codefabric:common',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 
           'meteor',
           'check',
           'coffeescript',
           'templating']);

  api.export(['CodeFabric', 'namespace'], ['client', 'server']);
  //api.export('namespace', ['client', 'server']);

  // *** Standard CodeFabric Structure *** //

  api.addFiles([
    'global_namespaces.js',
    'lib/namespaces.coffee',
  ], ['client', 'server']);

  api.addFiles([
    'client/namespaces.coffee'
  ], ['client']);

  api.addFiles([
    'server/namespaces.coffee'
  ], ['server']);

  // *** Package Files *** //

  api.addFiles([
    'lib/namespaceBuilder.js',
    'lib/resolver.coffee',
    'lib/syntax.coffee',
    'lib/validation/checkValidators.coffee',
    'lib/base.coffee',
    'lib/model.coffee'
  ], ['client', 'server'])

  api.addFiles([
    'client/lib/view.coffee',
    'client/lib/extensions/arrayExtensions.coffee',
    'client/lib/helpers/utilities.coffee',
    'client/lib/helpers/development.coffee',
    'client/lib/helpers/math.coffee'
  ], ['client'])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('coffeescript');
  api.use('tinytest');
  api.use('codefabric:common');

  api.addFiles('tests/client/tests.coffee', 'client');
  api.addFiles('tests/server/tests.coffee', 'server');
});