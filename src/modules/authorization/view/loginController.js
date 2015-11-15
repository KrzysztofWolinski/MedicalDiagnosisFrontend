'use strict';

angular.module('medicalDiagnosis.authorization')
	.controller('loginController', [
		'$scope',
		'$window',
		'AuthService',
		'AUTH_RESPONSE_STATUS',
		function($scope, $window, AuthService, AUTH_RESPONSE_STATUS) {
			
			$scope.states = {
				loading: 'loading',
				ok: 'ok',
				invalid: 'invalid',
				error: 'error'
			};

			$scope.state = $scope.states.ok;

			$scope.user = {
				username: '',
				password: ''
			};

			$scope.isSubmitEnabled = function() {
				if (($scope.user.username !== '') && ($scope.user.password !== '')) {
					return true;
				} else {
					return false;
				}

			};

			$scope.login = function() {
				if ($scope.isSubmitEnabled()) {
					$scope.state = $scope.states.loading;

					AuthService.login($scope.user.username, $scope.user.password).then(function(result) {
						if (result === AUTH_RESPONSE_STATUS.ok) {
							$scope.state = $scope.states.ok;
						} else if (result === AUTH_RESPONSE_STATUS.invalid) {
							$scope.state = $scope.states.invalid;
						} else {
							$scope.state = $scope.states.error;
						}
						
					}, function() {
						$scope.loginFailed = true;
					});
				}
			};

			function init() {
				$window.document.getElementById('username').focus();
			}

			init();

		}
	]);