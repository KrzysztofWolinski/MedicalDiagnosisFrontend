'use strict';

angular.module('medicalDiagnosis.services')
	.provider('AuthService', function AuthServiceProvider() {

		this.$get = ['$log', '$state', function AuthServiceFactory($log, $state) {
			var isLogged = false;

			var service = {
				login: login,
				logout: logout,
				checkAuthorization: checkAuthorization
			}

			function login() {
				isLogged = true;
				$state.go('home');
			}
		
			function logout() {
				isLogged = false;
				$state.go('login');
			}

			function checkAuthorization() {
				return isLogged;
			}

			return service;
		}];

	});
