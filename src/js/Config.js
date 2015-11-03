angular.module('medicalDiagnosis.services', []);

angular.module('medicalDiagnosis.controllers', []);

angular.module('medicalDiagnosis', [
	'ui.router',
	'medicalDiagnosis.services',
	'medicalDiagnosis.controllers'
	])
	.config(['$httpProvider',
		function($httpProvider) {
			'use strict';
			$httpProvider.defaults.timeout = 5000;
		}
	]);