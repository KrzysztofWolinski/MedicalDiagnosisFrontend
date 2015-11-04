'use strict';

angular.module('medicalDiagnosis.controllers')
	.controller('navigationController', [
		'$scope',
		'$state',
		'AuthService',
		function($scope, $state, AuthService) {
			
			$scope.state = $state;

			$scope.logout = AuthService.logout;

		}
	]);