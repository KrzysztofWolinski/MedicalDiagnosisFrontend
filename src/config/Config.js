angular.module('medicalDiagnosis.authorization', []);

angular.module('medicalDiagnosis.navigation', []);

angular.module('medicalDiagnosis.profile', []);

angular.module('medicalDiagnosis.diagnosis', []);

angular.module('medicalDiagnosis.history', []);

angular.module('medicalDiagnosis', [
	'ui.router',
	'ui.utils.masks',
	'medicalDiagnosis.authorization',
	'medicalDiagnosis.navigation',
	'medicalDiagnosis.profile',
	'medicalDiagnosis.diagnosis',
	'medicalDiagnosis.history'
	])
	.config(['$httpProvider',
		function($httpProvider) {
			'use strict';
			$httpProvider.defaults.timeout = 5000;
		}
	]);