'use strict';

angular.module('medicalDiagnosis.history')
	.controller('resultsController', [
		'$scope',
		'historyRepository',
		'$stateParams',
		function($scope, historyRepository, $stateParams) {
			
			$scope.states = {
				loading: 'loading',
				ok: 'ok',
				error: 'error'
			};

			$scope.isEditing = false;
			$scope.isSubmitting = false;
			$scope.isError = false;

			$scope.conditionList = [];

			var backupConditionsProbability;
			var backupRated;

			$scope.edit = function() {
				$scope.isError = false;
				$scope.isEditing = true;
				backupRated = $scope.dataBlock.rated;
				$scope.dataBlock.rated = false;
				backupConditionsProbability = angular.copy($scope.conditionProbability);
			};

			$scope.cancel = function() {
				$scope.isError = false;
				$scope.isEditing = false;
				$scope.dataBlock.rated = backupRated;
				$scope.conditionProbability = angular.copy(backupConditionsProbability);
			};

			$scope.accept = function() {
				$scope.isSubmitting = true;
				$scope.isError = false;

				angular.forEach($scope.conditionProbability, function(entry) {
					entry.probability = 100;
				});

				historyRepository.submitResultReview($stateParams.id, $scope.conditionProbability).then(function() {
					$scope.isSubmitting = false;
					$scope.isEditing = false;
					$scope.dataBlock.rated = true;	
				}, function() {
					$scope.isSubmitting = false;
					$scope.isError = true;
				});		
			};

			$scope.addCondition = function(diseaseName) {
				if (diseaseName !== '') {

					var exists = false;
					angular.forEach($scope.conditionProbability, function(entry) {
						if (entry.diseaseName === diseaseName) {
							exists = true;
						}
					});

					if (!exists) {
						$scope.conditionProbability.push({
							diseaseName: diseaseName, 
							probability: '100'
						});
					}
				}
			};

			$scope.removeCondition = function(index) {
				$scope.conditionProbability.splice(index, 1);
			}

			function init() {
				$scope.state = $scope.states.loading;
				historyRepository.getHistoricDataResult($stateParams.id).then(function(results) {
					$scope.state = $scope.states.ok;
					$scope.dataBlock = results.dataBlock;
					$scope.conditionProbability = results.conditionProbability;
				}, function() {
					$scope.state = $scope.states.error;
				});

				historyRepository.getConditionsList().then(function(response) {
					$scope.conditionList = response;
				}, function() {
					$scope.state = $scope.states.error;
				});
			}

			init();

		}
	]);