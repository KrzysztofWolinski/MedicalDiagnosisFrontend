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

			$scope.tabs = {
				byName: 'by-name',
				byDate: 'by-date',
				diagnoses: 'diagnoses'
			};

			$scope.selectTab = function(tab) {
				if ($scope.state === $scope.states.ok) {
					if ($scope.activeTab !== tab) {
						$scope.activeTab = tab;

						downloadData(tab);
					}
				}
			};

			function downloadData(tab) {
				var request;

				if (tab === $scope.tabs.byName) {
					$scope.state = $scope.states.loading;
					request = historyRepository.getHistoricDataByName();
				} else if (tab === $scope.tabs.byDate) {
					$scope.state = $scope.states.loading;
					request = historyRepository.getHistoricDataByDate();
				} else if (tab === $scope.tabs.diagnoses) {
					$scope.state = $scope.states.loading;
					request = historyRepository.getHistoricDataDiagnoses();
				}

				request.then(function(response) {
					$scope.state = $scope.states.ok;
					// TODO data
				}, function(){
					$scope.state = $scope.states.error;	
				});
			}


			function init() {
				$scope.state = $scope.states.ok;
				$scope.selectTab($scope.tabs.byDate);
			}

			init();

		}
	]);