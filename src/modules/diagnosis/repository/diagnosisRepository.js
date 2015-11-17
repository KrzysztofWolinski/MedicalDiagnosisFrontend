'use strict';

angular.module('medicalDiagnosis.diagnosis')
	.factory('diagnosisRepository', [
		'$http',
		'$q',
		'AuthService',
		'MEDICAL_DIAGNOSIS_URL',
		'APPLICATION_JSON_VALUE',
		function($http, $q, AuthService, MEDICAL_DIAGNOSIS_URL, APPLICATION_JSON_VALUE) {

			var service = {
				getForm: function() {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/diagnosis/form',
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
				submitForm: function(formFields) {
					var deferred = $q.defer();

					var data = {
						formFields: formFields
					};

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/diagnosis/submit',
							headers: {
								'Content-Type': APPLICATION_JSON_VALUE
							},
							data: {
								username: AuthService.getUsername(),
								token: AuthService.getToken(),
								data: data
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
				performDiagnosis: function() {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/diagnosis/perform',
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
				}
			};

			return service;
		}
	]);