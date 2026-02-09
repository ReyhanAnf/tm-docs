/**
 * Custom Docusaurus Plugin for Protected Routes
 * This plugin wraps the entire app with route protection logic
 */

const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-protected-routes',

    getClientModules() {
      return [path.resolve(__dirname, './protectedRoutesClient')];
    },
  };
};
