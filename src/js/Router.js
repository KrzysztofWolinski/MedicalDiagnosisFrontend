'use strict';

angular.module('medicalDiagnosis')
    .config([
        '$stateProvider',
        function($stateProvider) {

            var checkAuthorization = ['$injector', 'AuthService', '$state', function($injector, AuthService, $state) {
                if (!AuthService.checkAuthorization()) {
                    $state.go('login');
                }
                    
            }];

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login.html',
                    data: {
                        showMenu: false
                    }
                })
                
                .state('home', {
                    url: '/home',
                    templateUrl: 'partials/home.html',
                    onEnter: checkAuthorization,
                    data: {
                        showMenu: true
                    }
                })
                .state('diagnosis', {
                    url: '/diagnosis',
                    templateUrl: 'partials/diagnosis.html',
                    onEnter: checkAuthorization,
                    data: {
                        showMenu: true
                    }
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'partials/profile.html',
                    onEnter: checkAuthorization,
                    data: {
                        showMenu: true
                    }
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'partials/about.html',
                    onEnter: checkAuthorization,
                    data: {
                        showMenu: true
                    }
                });           
        }
    ]);
