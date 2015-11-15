'use strict';

angular.module('medicalDiagnosis.profile')
	.factory('profileRepository', [
		'$http',
		'$q',
		'AuthService',
		'MEDICAL_DIAGNOSIS_URL',
		'APPLICATION_JSON_VALUE',
		function($http, $q, AuthService, MEDICAL_DIAGNOSIS_URL, APPLICATION_JSON_VALUE) {

			var service = {
				getUserProfile: function() {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/user/get',
							headers: {
								'Content-Type': APPLICATION_JSON_VALUE
							},
							data: {
								username: AuthService.getUsername(),
								token: AuthService.getToken()
							}
						})
						.success(function(data) {
							deferred.resolve(data);
						})
						.error(function() {
							deferred.reject();
						});

					return deferred.promise;
				},
				updateUserProfile: function(user) {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/user/update',
							headers: {
								'Content-Type': APPLICATION_JSON_VALUE
							},
							data: {
								username: AuthService.getUsername(),
								token: AuthService.getToken(),
								user: user
							}
						})
						.success(function(data) {
							deferred.resolve(data);
						})
						.error(function() {
							deferred.reject();
						});

					return deferred.promise;
				}
			};

			return service;
		}
	]);