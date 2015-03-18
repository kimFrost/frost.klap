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
	function MainCtrl($timeout, $http, $sce) {

		var main = this;
		main.options = {
			debug: true
		};
		main.lockScrollTop = 0;
		main.overlays = {
			menu: {
				states: {
					show: false
				}
			},
			case: {
				html: 'NOT SET',
				states: {
					show: false
				}
			}
		};
		main.states = {
			pending: false,
			success: false,
			error: false,
			lockPageScroll: false
		};

		// Public functions
		main.flowToggleOverlay = flowToggleOverlay;
		main.toggleOverlay = toggleOverlay;

		/**---------------------------------------
		 CONSTRUCTORS
		 ---------------------------------------**/

		/**---------------------------------------
		 FUNCTION LIBRARY
		 ---------------------------------------**/

		function flowToggleOverlay() {
			// if close all active overlays, or show first available overlay in the object holder
			var anyActive;
			var key;
			for (key in main.overlays) {
				if (main.overlays[key].states.show) {
					anyActive = true;
				}
			}
			if (anyActive) {
				closeAllOverlays();
			}
			else {
				for (key in main.overlays) {
					toggleOverlay(key, true);
					break;
				}
			}
		}

		function toggleOverlay(id, state, contentID) {
			state = (state === undefined) ? 'toggle' : state;
			contentID = (contentID === undefined) ? '' : contentID;
			contentID = contentID.toString();
			log('toggleOverlay', contentID);
			if (main.overlays[id] === undefined) {
				var activeId;
				for (var key in main.overlays) {
					if (main.overlays[key].states.show) {
						activeId = key;
					}
				}
				if (activeId === undefined) {
					return activeId;
				}
				else {
					id = activeId;
				}
			}
			if (state === 'toggle') {
				state = !main.overlays[id].states.show;
			}
			//window.snap.scrollLock = main.states.lockPageScroll;
			if (state) {
				// Get Content if contentID id defined
				if (contentID.length > 0) {
					var content = getOverlayContent(contentID);
					main.overlays[id].html = $sce.trustAsHtml(content);
				}
				main.lockScrollTop = window.pageYOffset;
				for (var key in main.overlays) {
					if (key !== id) {
						main.overlays[key].states.show = !state;
					}
				}
			}
			else {
				 setTimeout(function () {
				 	window.scrollTo(0, main.lockScrollTop);
				 }, 50);
			}
			main.overlays[id].states.show = state;
			main.states.lockPageScroll = state;
		}

		function closeAllOverlays(event) {
			for (var key in main.overlays) {
				main.overlays[key].states.show = false;
			}
			main.states.lockPageScroll = false;
			setTimeout(function () {
				window.scrollTo(0, main.lockScrollTop);
			}, 50);

		}

		function getOverlayContent(id) {
			var html = '';
			if (id !== undefined) {
				html += '<div>Test ' + id + '</div>';
				html += '<div data-wavesurfer="https://ia902508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3"></div>';
				//html += '<audio controls data-wavesurfer>';
				//html += '<source src="https://ia902508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3" type="audio/mpeg">';
				//html += '</audio>';
			}
			return html;
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
