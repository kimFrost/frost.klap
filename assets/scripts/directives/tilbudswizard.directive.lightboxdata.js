
(function (undefiend) {
	'use strict';

	angular
		.module('tilbudswizard')
		.directive('lightboxdata', tooltip);

	function tooltip() {
		var directive = {
			replace: false,
			link: link,
			scope: false,
			restrict: 'A',
			controller: function($scope) {

				// Function Library

				// Directive functions

			}
		};
		return directive;

		function link(scope, element, attrs) {
			/*
			scope.tilbudswizardctrl.lightboxes.push({
				title: attrs.lightboxdata,
				html: element[0].innerHTML
			});
			*/
			scope.tilbudswizardctrl.lightboxes[attrs.lightboxdata] = {
				title: attrs.lightboxdata,
				html: element[0].innerHTML,
				states: {
					show: false
				}
			};
		}
	}
})();

