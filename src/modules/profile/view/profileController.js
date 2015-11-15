'use strict';

angular.module('medicalDiagnosis.profile')
	.controller('profileController', [
		'$scope',
		'profileRepository',
		function($scope, profileRepository) {
			
			$scope.states = {
				loading: 'loading',
				ok: 'ok',
				submitting: 'submitting',
				success: 'success',
				error: 'error'
			};

			$scope.state = $scope.states.ok;
			$scope.editingEnabled = false;

			$scope.control = {
				toggleEdit: toggleEdit,
				submit: submit,
				cancel: cancel
			};

			$scope.user = undefined;
			$scope.backupUser = undefined;

			function toggleEdit() {
				$scope.backupUser = angular.copy($scope.user);
				$scope.editingEnabled = true;
				$scope.state = $scope.states.ok;
			}

			function submit() {
				$scope.state = $scope.states.submitting;
				profileRepository.updateUserProfile($scope.user).then(function() {
					$scope.state = $scope.states.success;
					$scope.editingEnabled = false;
					$scope.backupUser = angular.copy($scope.user);
				}, function() {
					$scope.state = $scope.states.error;
				});
			}

			function cancel() {
				$scope.user = angular.copy($scope.backupUser);
				$scope.editingEnabled = false;
			}

			function init() {
				$scope.state = $scope.states.loading;
				profileRepository.getUserProfile().then(function(user) {
					if (user !== null) {
						$scope.user = user;
						$scope.backupUser = angular.copy($scope.user);
						$scope.state = $scope.states.ok;
						$scope.editingEnabled = false;
					} else {
						$scope.state = $scope.states.error;	
					}
				}, function() {
					$scope.state = $scope.states.error;
				});
			}

			init();
		}
	]);