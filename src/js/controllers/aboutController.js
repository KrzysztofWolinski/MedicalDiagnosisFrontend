'use strict';

angular.module('medicalDiagnosis')
	.controller('aboutController', [
		'$http',
		'$scope',
		function($http, $scope) {
			
			$scope.message = 'loading';
			$http.get('medical-diagnosis-integration/object')
				.success(function(data) {
					$scope.message = data;
				})
				.error(function() {
					$scope.message = 'Error occured...';
				});

		}
	]);