'use strict';

angular.module('medicalDiagnosis.authorization')
	.provider('AuthService', function AuthServiceProvider() {

		this.$get = [
			'$log', 
			'$state', 
			'authRepository', 
			'$q',
			'AUTH_RESPONSE_STATUS',
			function AuthServiceFactory($log, $state, authRepository, $q, AUTH_RESPONSE_STATUS) {

				var user = {
					username: '',
					token: ''
				};

				var service = {
					login: login,
					logout: logout,
					checkAuthorization: checkAuthorization
				};

				function login(username, password) {
					var deferred = $q.defer();

					authRepository.login(username, password).then(function(response) {
						if (response.status === AUTH_RESPONSE_STATUS.ok) {
							user.username = username;
							user.token = response.token;

							$state.go('home');

							deferred.resolve(AUTH_RESPONSE_STATUS.ok);
						} else {
							deferred.resolve(AUTH_RESPONSE_STATUS.error);
						}
					});

					return deferred.promise;
				}
			
				function logout() {
					var deferred = $q.defer();

					authRepository.logout(user.username, user.token).then(function(response) {
						user.username = '';
						user.token = '';

						$state.go('login');

						deferred.resolve(response.status);
					});

					return deferred.promise;
				}

				function checkAuthorization() {
					var deferred = $q.defer();

					if ((user.username !== '') && (user.token !== '')) {
						authRepository.checkAuthorization(user.username, user.token).then(function(response) {
							if (response.status === AUTH_RESPONSE_STATUS.ok) {
								deferred.resolve(true);
							} else {
								deferred.resolve(false);
							}
						});
					} else {
						deferred.resolve(false);
					}

					return deferred.promise;
				}

				return service;
			}];

	});
