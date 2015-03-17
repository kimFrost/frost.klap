// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();

(function (undefiend) {
	'use strict';

	angular
		.module('noerd.Klap')
		.directive('dragContainer', ['$timeout', dragContainer]);

	function dragContainer($timeout) {
		var directive = {
			replace: false,
			link: link,
			scope: false,
			restrict: 'A',
			controller: controller,
			controllerAs: 'dragcon',
			bindToController: true
		};
		return directive;

		function link(scope, element, attrs) {

			scope.dragcon.elem = element;

			// Update Loop
			function updateLoop() {
				// Set next update call
				window.requestAnimFrame(updateLoop);
				// Update values
				update();
			}

			// Update
			function update() {
				var el = element[0];
				var offsets = el.getBoundingClientRect();
				// Push from top distance
				var topDiff = offsets.top;
				// Self height
				var height = offsets.height;
				if (topDiff > 0) {
					topDiff = 0;
				}
				topDiff = Math.abs(topDiff);
				scope.dragcon.metric.height = height;
				scope.dragcon.metric.pushFromTop = topDiff;
				// Child component will self cal and monitor distance from bottom
			}

			function handlePressed(e) {
				console.log('pressed');
				scope.dragcon.states.pressed = true;
			}

			function handleRelease(e) {
				console.log('release');
				scope.dragcon.states.pressed = false;
			}

			function handleMove(e) {
				if (scope.dragcon.states.pressed) {
					e.preventDefault();
					console.log('move');
				}
			}

			updateLoop();

			// Bind to input events
			scope.dragcon.elem[0].addEventListener('touchstart', handlePressed);
			scope.dragcon.elem[0].addEventListener('mousedown', handlePressed);
			scope.dragcon.elem[0].addEventListener('touchend', handleRelease);
			scope.dragcon.elem[0].addEventListener('mouseup', handleRelease);
			scope.dragcon.elem[0].addEventListener('mouseleave', handleRelease);
			scope.dragcon.elem[0].addEventListener('touchmove', handleMove);
			scope.dragcon.elem[0].addEventListener('mousemove', handleMove);
		}

		// Inject dependecies to controller
		controller.$inject = ['$element'];

		function controller($element) {
			var dragcon = this;
			dragcon.options = {};
			dragcon.metric = {
				height: null,
				pushFromTop: null
			};
			dragcon.elem = $element;
			dragcon.states = {
				pressed: false
			};
			dragcon.temp = {};
			dragcon.css = {};

			// Directive functions
			dragcon.getMetric = function() {
				return this.metric;
			}
		}
	}
})();

