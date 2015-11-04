'use strict';

angular.module('medicalDiagnosis.authorization')
	.controller('loginController', [
		'$scope',
		'AuthService',
		function($scope, AuthService) {
			
			$scope.login = AuthService.login;
			$scope.user = {
				username: '',
				password: ''
			};

			$scope.isSubmitButtonEnabled = function() {
				if (($scope.user.username !== '') && ($scope.user.password != '')) {
					return true;
				} else {
					return false;
				}

			}

		}
	]);