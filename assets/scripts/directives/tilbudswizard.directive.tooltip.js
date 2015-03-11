
(function (undefiend) {
	'use strict';

	angular
		.module('tilbudswizard')
		.directive('tooltip', ['$timeout', '$rootScope', tooltip]);

	function tooltip($timeout, $rootScope) {
		var directive = {
			replace: false,
			link: link,
			scope: {
				tooltip: '@'
			},
			restrict: 'A',
			controller: function($scope) {

				// Function Library

				// Directive functions

			}
		};
		return directive;

		function link(scope, element, attrs) {

			element.bind('mouseenter', function(event) {
				scope.$apply(function() {
					$rootScope.$broadcast('tooltipEnter', {
						text: scope.tooltip,
						elem: element
					});
				});
			});
			element.bind('mouseleave', function(event) {
				scope.$apply(function() {
					$rootScope.$broadcast('tooltipLeave', {
						text: scope.tooltip,
						elem: element
					});
				});
			});
		}
	}
})();

