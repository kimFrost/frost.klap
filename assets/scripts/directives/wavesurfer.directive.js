(function (undefiend) {
	'use strict';

	angular
		.module('noerd.Klap')
		.directive('wavesurfer', ['$timeout', wavesurfer]);

	function wavesurfer($timeout) {
		var directive = {
			replace: false,
			link: link,
			scope: false,
			restrict: 'A',
			controller: controller,
			controllerAs: 'wavesurfer',
			bindToController: true
		};
		return directive;

		function link(scope, element, attrs) {

			scope.wavesurfer.elem = element;

		}

		// Inject dependecies to controller
		controller.$inject = ['$element'];

		function controller($element) {
			var wavesurfer = this;
			wavesurfer.options = {};
			wavesurfer.elem = $element;
			wavesurfer.wavesurfer = Object.create(wavesurfer);
			wavesurfer.states = {

			};
			wavesurfer.temp = {};
			wavesurfer.css = {};


			//wavesurfer.wavesurfer.init();

			// Directive functions
			wavesurfer.getMetric = function() {
				return this.states;
			}
		}
	}
})();

