let myApp = angular.module('myApp', ['ui.router', 'ngResource', 'ngMaterial']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            template: '<shop></shop>',
            access: {restricted: true},
            abstract: true
        })
        .state('login', {
            url: '/login',
            template: '<login></login>',
        })
        .state('register', {
            url: '/register',
            template: '<register></register>',
        })
        .state('main.catalog', {
            url: '',
            template: '<catalog></catalog>',
            access: {restricted: true}
        })
        .state('main.cart', {
            url: 'cart',
            template: '<cart></cart>',
            access: {restricted: true}
        });
    $urlRouterProvider.otherwise('/');
});

myApp.run(function ($rootScope, $state, userService) {
    $rootScope.$on('$stateChangeStart',
        function (event, next, current) {
            if (next.access && next.access.restricted) {
                userService.getUserLoginStatus()
                    .then((result) => {
                        if (result.data.status) {
                            //ui router currently facing a bug of infinite loops on state change so in order to have this correctly a workaround was needed to be written (the notify: false and broadcast success)
                            $state.go(next, {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', next, {}, current, {})
                            });
                        } else {
                            $state.go('login', {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', 'login', {}, current, {});
                            })
                        }
                    });
                event.preventDefault()
            }
            if (next.name === 'login' || next.name === 'register') {
                userService.getUserLoginStatus()
                    .then((result) => {
                        if (result.data.status) {
                            $state.go('main.catalog', {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', 'main.catalog', {}, current, {});
                            })
                        } else {
                            $state.go(next, {}, {notify: false}).then(() => {
                                $rootScope.$broadcast('$stateChangeSuccess', next, {}, current, {});
                            })
                        }
                    });
                event.preventDefault()
            }
        });
});
