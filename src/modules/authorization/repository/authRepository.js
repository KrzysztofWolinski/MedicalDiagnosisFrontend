'use strict';

angular.module('medicalDiagnosis.authorization')
	.factory('authRepository', [
		'$http',
		'$q',
		'MEDICAL_DIAGNOSIS_URL',
		function($http, $q, MEDICAL_DIAGNOSIS_URL) {

			var APPLICATION_JSON_VALUE = 'application/json;charset=UTF-8';

			var service = {
				login: function(username, password) {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/auth/login',
							headers: {
								'Content-Type': APPLICATION_JSON_VALUE
							},
							data: {
								username: username,
								password: password
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
				logout: function(username, token) {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/auth/logout',
							headers: {
								'Content-Type': APPLICATION_JSON_VALUE
							},
							data: {
								username: username,
								token: token
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
				checkAuthorization: function(username, token) {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/auth/check',
							headers: {
								'Content-Type': APPLICATION_JSON_VALUE
							},
							data: {
								username: username,
								token: token
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