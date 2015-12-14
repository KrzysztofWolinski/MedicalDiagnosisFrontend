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

			function init() {
				$scope.state = $scope.states.loading;
				historyRepository.getHistoricDataResult($stateParams.id).then(function(results) {
					$scope.state = $scope.states.ok;
					$scope.dataBlock = results.dataBlock;
					$scope.conditionProbability = results.conditionProbability;
				}, function() {
					$scope.state = $scope.states.error;
				});
			}

			init();

		}
	]);