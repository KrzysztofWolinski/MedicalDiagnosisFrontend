'use strict';

angular.module('medicalDiagnosis.authorization')
	.factory('authRepository', [
		'$http',
		'$q',
		'MEDICAL_DIAGNOSIS_URL',
		function($http, $q, MEDICAL_DIAGNOSIS_URL) {

			var service = {
				login: function(username, password) {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/auth/login',
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