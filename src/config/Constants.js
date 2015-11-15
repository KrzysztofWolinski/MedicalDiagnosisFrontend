angular.module('medicalDiagnosis')
	.constant('MEDICAL_DIAGNOSIS_URL', 'medical-diagnosis-integration')
	.constant('APPLICATION_JSON_VALUE', 'application/json;charset=UTF-8')
	.constant('AUTH_RESPONSE_STATUS', {
		ok: 'OK',
		invalid: 'INVALID',
		error: 'ERROR'
	});
