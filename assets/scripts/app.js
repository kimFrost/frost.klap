(function (undefined) {
    'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('noerd.Klap', ['ngSanitize'])
  .run(function () {
    console.log('Main Application Run()');
  });
})();
