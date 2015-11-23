'use strict';

angular.module('medicalDiagnosis.history')
	.controller('historyController', [
		'$scope',
		'historyRepository',
		function($scope, historyRepository) {
			
			$scope.states = {
				loading: 'loading',
				ok: 'ok',
				error: 'error'
			};

			$scope.selectTab = function(tab) {
				if ($scope.state === $scope.states.ok) {
					if ($scope.activeTab !== tab) {
						$scope.activeTab = tab;
					}
				}
			};

			function init(){
				$scope.activeTab = 'by-date';
				$scope.state = $scope.states.loading;

				historyRepository.getHistoricData().then(function(response) {
					$scope.state = $scope.states.ok;
				}, function(){
					$scope.state = $scope.states.error;	
				});
			}

			init();

		}
	]);