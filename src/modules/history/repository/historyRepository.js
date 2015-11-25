'use strict';

angular.module('medicalDiagnosis.history')
	.factory('historyRepository', [
		'$http',
		'$q',
		'AuthService',
		'MEDICAL_DIAGNOSIS_URL',
		'APPLICATION_JSON_VALUE',
		function($http, $q, AuthService, MEDICAL_DIAGNOSIS_URL, APPLICATION_JSON_VALUE) {

			function sendHistoricDataRequest(mode) {
				var deferred = $q.defer();

				$http({
						method: 'POST',
						url: MEDICAL_DIAGNOSIS_URL + '/history/' + mode,
						headers: {
							'Content-Type': APPLICATION_JSON_VALUE
						},
						data: {
							username: AuthService.getUsername(),
							token: AuthService.getToken()
						}
					})
					.success(function(response) {
						deferred.resolve(response.data);
					})
					.error(function() {
						deferred.reject();
					});

				return deferred.promise;
			}


			var service = {
				getHistoricDataByDate: function() {
					return sendHistoricDataRequest('by-date');
				},
				getHistoricDataByName: function() {
					return sendHistoricDataRequest('by-name');
				},
				getHistoricDataDiagnoses: function() {
					return sendHistoricDataRequest('diagnoses');
				}
			};

			return service;
		}
	]);