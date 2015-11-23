'use strict';

angular.module('medicalDiagnosis.history')
	.factory('historyRepository', [
		'$http',
		'$q',
		'AuthService',
		'MEDICAL_DIAGNOSIS_URL',
		'APPLICATION_JSON_VALUE',
		function($http, $q, AuthService, MEDICAL_DIAGNOSIS_URL, APPLICATION_JSON_VALUE) {

			var service = {
				getHistoricData: function() {
					var deferred = $q.defer();

					$http({
							method: 'POST',
							url: MEDICAL_DIAGNOSIS_URL + '/history/data',
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