'use strict';

angular.module('medicalDiagnosis.authorization')
	.controller('loginController', [
		'$scope',
		'AuthService',
		'AUTH_RESPONSE_STATUS',
		function($scope, AuthService, AUTH_RESPONSE_STATUS) {
			
			$scope.loginFailed = false;
			$scope.user = {
				username: '',
				password: ''
			};

			$scope.isSubmitEnabled = function() {
				if (($scope.user.username !== '') && ($scope.user.password != '')) {
					return true;
				} else {
					return false;
				}

			}

			$scope.login = function() {
				if ($scope.isSubmitEnabled()) {
					AuthService.login($scope.user.username, $scope.user.password).then(function(result) {
						if (result === AUTH_RESPONSE_STATUS.ok) {
							$scope.loginFailed = false;	
						} else {
							$scope.loginFailed = true;	
						}
						
					}, function() {
						$scope.loginFailed = true;
					});
				}
			}

		}
	]);