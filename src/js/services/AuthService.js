'use strict';

angular.module('medicalDiagnosis.services')
	.provider('AuthService', function AuthServiceProvider() {

		this.$get = ['$log', function AuthServiceFactory($log) {
			var isLogged = false;

			var service = {
				login: login,
				logout: logout,
				checkAuthorization: checkAuthorization
			}

			function login() {
				isLogged = true;
			}
		
			function logout() {
				isLogged = false;
			}

			function checkAuthorization() {
				return isLogged;
			}

			return service;
		}];

	});
