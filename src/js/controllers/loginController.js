'use strict';

angular.module('medicalDiagnosis.controllers')
	.controller('loginController', [
		'$scope',
		'AuthService',
		function($scope, AuthService) {
			
			$scope.login = AuthService.login;

		}
	]);