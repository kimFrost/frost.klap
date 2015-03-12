(function (undefined) {
	'use strict';

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	/**
	 * @ngdoc overview
	 * @name AddCard
	 * @description
	 * #
	 *
	 * Main module of the application.
	 */

	angular
		.module('noerd.Klap')
		.controller('MainCtrl', MainCtrl);

	/* @ngInject */
	function MainCtrl($timeout, $http) {

		var main = this;
		main.options = {
			debug: true
		};
		main.states = {
			pending: false,
			success: false,
			error: false,
			showMenu: false
		};

		// Public functions
		main.toggleMenu = toggleMenu;

		/**---------------------------------------
		 CONSTRUCTORS
		 ---------------------------------------**/

		/**---------------------------------------
		 FUNCTION LIBRARY
		 ---------------------------------------**/

		function toggleMenu() {
			main.states.showMenu = !main.states.showMenu;
		}


		// Debug log
		function log(msg1, msg2) {
			msg1 = (msg1 === undefined) ? null : msg1;
			msg2 = (msg2 === undefined) ? null : msg2;
			if (main.options.debug) {
				if (msg2 !== null) {
					try {
						console.log(msg1, msg2);
					}
					catch (err) {

					}
				}
				else {
					try {
						console.log(msg1);
					}
					catch (err) {

					}
				}
			}
		}

		/**---------------------------------------
		 BINDINGS
		 ---------------------------------------**/


	}
})();
