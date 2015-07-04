'use strict';

angular.module('starter.controllers', [])

.controller('MapCtrl', function (APP_CONTEXT, AppLog, AppPostion, $scope) {

    var defaultPosition = AppPostion.getDefaultPosition();

    angular.extend($scope, {
        defaults: {
            tileLayer: 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/carnav.day.grey/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}',
            maxZoom: 18,
            minZoom: 16,
        }
    });

    $scope.center = {
        lat: defaultPosition.lat,
        lng: defaultPosition.lng,
        zoom: 18
    };

    $scope.myPosition = AppPostion.getPosition();
    $scope.markers = {};

    AppPostion.callback = function (position) {
        $scope.markers = {
            main_marker: {
                lat: position.lat,
                lng: position.lng
            }
        };
    };

})

.controller('DashCtrl', function (APP_CONTEXT, AppLog, $scope) {
    $scope.context = APP_CONTEXT;
})

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});