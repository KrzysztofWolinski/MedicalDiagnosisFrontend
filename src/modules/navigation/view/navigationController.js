'use strict';

angular.module('medicalDiagnosis.navigation')
	.controller('navigationController', [
		'$scope',
		'$state',
		'AuthService',
		function($scope, $state, AuthService) {
			
			$scope.logout = AuthService.logout;
			$scope.state = $state;

			$scope.username = AuthService.getUsername();

			$scope.isActiveState = function(requestedState) {
				if ($scope.state.current.name.split('.')[0] === requestedState) {
					return true;
				} else {
					return false;
				}
			};
		}
	]);