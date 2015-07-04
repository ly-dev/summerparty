'use strict';

angular.module('starter', [
    'ionic',
    'leaflet-directive',
    'ngCordova',
    'firebase',
    'starter.controllers',
    'starter.services'])

// global constant
.constant('APP_CONFIG', {
    /*REPLACE*/
    DEBUG: true /*REPLACE*/ ,
    XDEBUG_KEY: 'XDEBUG_SESSION_START',
    XDEBUG_VALUE: 'ECLIPSE_DBGP',
    ALLOW_ORIGIN: '*',
    HOME_URL: '/app/home',
    /*REPLACE*/
    SERVER_URL: 'http://lyionic:8100' /*REPLACE*/ ,
    ENDPOINT_URI: '/api/v1',
    /*REPLACE*/
    APP_VERSION: 'x.x.x' /*REPLACE*/
})

.value('APP_CONTEXT', {
    env: 'web'
})

.run(function ($ionicPlatform, AppLog, APP_CONTEXT) {
    AppLog.debug('Run app');

    $ionicPlatform.ready(function () {
        AppLog.debug('Platform ready');

        if (window.cordova) {
            APP_CONTEXT.env = 'device';

            if (window.cordova.plugins.Keyboard) {
                AppLog.debug('Hide the accessory bar above keyboard by default');
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                AppLog.debug('org.apache.cordova.statusbar required');
                StatusBar.styleDefault();
            }

            AppLog.debug('Prepare pause/resume event listener');
            document.addEventListener('resume', function (event) {
                AppLog.debug(['Received event: resume; ', event]);
            }, false);
            document.addEventListener('pause', function (event) {
                AppLog.debug(['Received event: pause; ', event]);
            }, false);

            AppLog.debug('Prepare network event listener');
            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                AppLog.debug(['Received event: online; ', networkState, '; ', event]);
            })
            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                AppLog.debug(['Received event: offline; ', networkState, '; ', event]);
            })
        } else {
            APP_CONTEXT.env = 'web';
        }

    });
})

.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    // html5 mode
    $locationProvider.html5Mode(false);

    // setup an abstract state for the tabs directive
    $stateProvider.state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.map', {
        url: '/map',
        views: {
            'tab-map': {
                templateUrl: 'templates/tab-map.html',
                controller: 'MapCtrl'
            }
        }
    })

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/map');

});