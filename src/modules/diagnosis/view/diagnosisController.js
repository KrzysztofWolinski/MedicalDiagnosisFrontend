'use strict';

angular.module('medicalDiagnosis.diagnosis')
	.controller('diagnosisController', [
		'$scope',
		'diagnosisRepository',
		function($scope, diagnosisRepository) {
			
			$scope.states = {
				ok: 'ok',
				loading: 'loading',
				submitting: 'submitting',
				success: 'success',
				error: 'error'
			};

			$scope.formData = [];

			$scope.submitForm = function() {
				$scope.state = $scope.states.submitting;
				diagnosisRepository.submitForm($scope.formData).then(function(response) {
					$scope.state = $scope.states.success;
				}, function() {
					$scope.state = $scope.states.error;
				});
			};

			$scope.submitAndDiagnose = function() {
				// TODO
			};

			function init() {
				$scope.state = $scope.states.loading;
				diagnosisRepository.getForm().then(function(response) {
					$scope.formData = response.formFields;
					$scope.state = $scope.states.ok;
				}, function() {
					$scope.state = $scope.states.error;
				});
			}

			init();

		}
	]);