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
		.directive('drag', ['$timeout', drag]);

	function drag($timeout) {
		var directive = {
			replace: false,
			require: '^dragContainer',
			link: link,
			scope: false,
			restrict: 'A',
			controller: controller,
			controllerAs: 'drag',
			bindToController: true
		};
		return directive;

		function link(scope, element, attrs, controller) {

			function updateLoop() {
				window.requestAnimFrame(updateLoop);
				update();
			}

			function update() {
				var metric = controller.getMetric();
				var offsets = element[0].getBoundingClientRect();
				//var children = element[0].childNodes;
				var children = element[0].children;
				var totalChildsWidth = 0;
				var lastChild = element[0].lastElementChild;
				var lastChildOffsets = lastChild.getBoundingClientRect();
				// Only force update if one of the metrics has changes




				// Set max translateX value in parent controller
				controller.options.maxTranslateX = -4116;

				if (metric.translateX != scope.drag.metric.translateX) {
					scope.drag.metric.translateX = metric.translateX;

					/*
					for (var i = 0; i < children.length; i++) {
						var child = children[i];
						var childOffsets = child.getBoundingClientRect();
						totalChildsWidth += childOffsets.width;
					}

					console.log('metric', metric);
					console.log('offsets', offsets);
					//console.log('totalChildsWidth', totalChildsWidth);

					//console.log('lastChildOffsets', lastChildOffsets);

					// Handle overdrag on right side
					if (offsets.left - scope.drag.metric.translateX > totalChildsWidth) {
						scope.drag.metric.translateX = offsets.left - scope.drag.metric.translateX;
					}
					*/

					updateData();
				}
				/*
				if (metric.pushFromTop != scope.drag.metric.pushFromTop || metric.height != scope.drag.metric.containerHeight || scope.drag.metric.height != offsets.height) {
					scope.drag.metric.pushFromTop = metric.pushFromTop;
					scope.drag.metric.containerHeight = metric.height;
					scope.drag.metric.height = offsets.height;
					updateData();
				}
				*/
			}

			function updateData() {
				var translateX = scope.drag.metric.translateX;
				var translateXPx = translateX + 'px';
				/*
				var maxPush = scope.drag.metric.containerHeight - scope.drag.metric.height;
				if (value > maxPush) {
					value = maxPush;
				}
				*/

				// Js direct set style for much better performance.
				element[0].style.mozTransform = 'translate(' + translateXPx + ', 0)';
				element[0].style.msTransform = 'translate(' + translateXPx + ', 0)';
				element[0].style.webkitTransform = 'translate(' + translateXPx + ', 0)';
				element[0].style.OTransform  = 'translate(' + translateXPx + ', 0)';
				element[0].style.transform = 'translate(' + translateXPx + ', 0)';

				/*
				var css = {
					"-moz-transform": "translate(0px, "+ value +"px)",
					"-ms-transform": "translate(0px, "+ value +"px)",
					"-webkit-transform": "translate(0px, "+ value +"px)",
					"transform": "translate(0px, "+ value +"px)"
				};
				scope.drag.css = css;
				setTimeout(function(){
					scope.$apply(); // Remove this for a better performance. But will not update on every tick
				},0);
				*/
			}
			updateLoop();
		}

		function controller() {
			var drag = this;
			drag.options = {};
			drag.metric = {
				top: null,
				left: null,
				pushFromTop: null,
				height: null,
				containerHeight: null
			};
			drag.states = {};
			drag.temp = {};
			drag.css = {};

			// Function Library
			// Visible
			drag.visible = function(element) {
				return (element.offsetWidth > 0 && element.offsetHeight > 0);
				/*
				if (element.offsetWidth > 0 && element.offsetHeight > 0) {
					return true;
				}
				else {
					return false;
				}
				*/
			};

		}
	}
})();
