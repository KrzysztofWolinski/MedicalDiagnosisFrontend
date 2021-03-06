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

			function validateForm() {
				var formValid = true;

				angular.forEach($scope.formData, function(group) {
					angular.forEach(group.fieldList, function(field) {
						if (field.value === null || field.value === undefined || field.value === '') {
							formValid = false;
						}
					});
				});

				return formValid;
			}

			$scope.submitForm = function() {
				if (validateForm()) {
					$scope.state = $scope.states.submitting;
					diagnosisRepository.submitForm($scope.formData).then(function(response) {
						$scope.state = $scope.states.success;
					}, function() {
						$scope.state = $scope.states.error;
					});
				}
			};

			$scope.selectTab = function(tab) {
				if (($scope.state !== $scope.states.submitting) && ($scope.state !== $scope.states.loading)) {
					if ($scope.activeTab !== tab) {
						$scope.activeTab = tab;
						$scope.state = $scope.states.ok;
					}
				}
			};

			function init() {
				$scope.state = $scope.states.loading;
				diagnosisRepository.getForm().then(function(response) {
					$scope.formData = response.formFieldGroups;
					$scope.state = $scope.states.ok;
					$scope.activeTab = 'submit';
				}, function() {
					$scope.state = $scope.states.error;
				});
			}

			init();

		}
	]);