'use strict';

angular.module('medicalDiagnosis.navigation')
	.controller('navigationController', [
		'$scope',
		'$state',
		'AuthService',
		'$interval',
		'diagnosisRepository',
		function($scope, $state, AuthService, $interval, diagnosisRepository) {
			
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

			$scope.newDiagnosesCount = 0;

			$interval(function() {
				diagnosisRepository.countNewDiagnoses(AuthService.getUsername()).then(function(result) {
					$scope.newDiagnosesCount = result;
				});
			}, 10000)
		}
	]);