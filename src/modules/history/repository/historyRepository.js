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

			function getHistoricDataResult(id) {
				var deferred = $q.defer();

				$http({
						method: 'POST',
						url: MEDICAL_DIAGNOSIS_URL + '/history/results',
						headers: {
							'Content-Type': APPLICATION_JSON_VALUE
						},
						data: {
							dataId: id,
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

			function submitResultReview(dataId, reviewedDiagnosis) {
				var deferred = $q.defer();

				$http({
						method: 'POST',
						url: MEDICAL_DIAGNOSIS_URL + '/history/review',
						headers: {
							'Content-Type': APPLICATION_JSON_VALUE
						},
						data: {
							dataId: dataId,
							newConditionProbabilities: reviewedDiagnosis,
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

			function getConditionsList() {
				var deferred = $q.defer();

				$http({
						method: 'GET',
						url: MEDICAL_DIAGNOSIS_URL + '/diagnosis/conditions',
						headers: {
							'Content-Type': APPLICATION_JSON_VALUE
						}
					})
					.success(function(response) {
						deferred.resolve(response);
					})
					.error(function() {
						deferred.reject();
					});

				return deferred.promise;
			}

			function deleteDataSet(id) {
				var deferred = $q.defer();

				$http({
						method: 'POST',
						url: MEDICAL_DIAGNOSIS_URL + '/history/delete/' + id,
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
				},
				getHistoricDataResult: function(id) {
					return getHistoricDataResult(id);
				},
				submitResultReview: function(dataId, reviewedDiagnosis) {
					return submitResultReview(dataId, reviewedDiagnosis);
				},
				getConditionsList: function() {
					return getConditionsList();
				},
				deleteDataSet: function(id) {
					return deleteDataSet(id);
				}
			};

			return service;
		}
	]);