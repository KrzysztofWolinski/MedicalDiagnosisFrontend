'use strict';

angular.module('medicalDiagnosis')
    .config([
        '$stateProvider',
        function($stateProvider) {

            var checkIsAuthorized = ['$injector', 'AuthService', '$state', function($injector, AuthService, $state) {
                if (!AuthService.checkAuthorization()) {
                    $state.go('login');
                }
            }];

            var checkIsNotAuthorized = ['$injector', 'AuthService', '$state', function($injector, AuthService, $state) {
                if (AuthService.checkAuthorization()) {
                    $state.go('home');
                }
            }];

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'modules/authorization/view/login.html',
                    onEnter: checkIsNotAuthorized,
                    data: {
                        showMenu: false
                    }
                })
                
                .state('home', {
                    url: '/home',
                    templateUrl: 'modules/navigation/view/home.html',
                    onEnter: checkIsAuthorized,
                    data: {
                        showMenu: true
                    }
                })
                .state('diagnosis', {
                    url: '/diagnosis',
                    templateUrl: 'modules/diagnosis/view/diagnosis.html',
                    onEnter: checkIsAuthorized,
                    data: {
                        showMenu: true
                    }
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'modules/profile/view/profile.html',
                    onEnter: checkIsAuthorized,
                    data: {
                        showMenu: true
                    }
                })
                .state('history', {
                    url: '/history',
                    templateUrl: 'modules/history/view/history.html',
                    onEnter: checkIsAuthorized,
                    data: {
                        showMenu: true
                    }
                });           
        }
    ]);
