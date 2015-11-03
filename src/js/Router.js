'use strict';

angular.module('medicalDiagnosis')
    .config([
        '$stateProvider',
        function($stateProvider) {

            var checkAuthorization = ['$injector', 'AuthService', function($injector, AuthService) {
                console.log('Auth: ' + AuthService.checkAuthorization());         
            }];

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'partials/home.html',
                    onEnter: checkAuthorization
                })
                .state('diagnosis', {
                    url: '/diagnosis',
                    templateUrl: 'partials/diagnosis.html',
                    onEnter: checkAuthorization
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'partials/profile.html',
                    onEnter: checkAuthorization
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'partials/about.html',
                    onEnter: checkAuthorization
                });           
        }
    ]);
