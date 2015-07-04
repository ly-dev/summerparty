'use strict';

angular.module('starter.controllers', [])

.controller('MapCtrl', function ($scope) {

    $scope.myLocation = {
        lat: 51.7579957,
        lng: -1.2354382,
        zoom: 18
    };

    $scope.markers = {
        main_marker: {
            lat: 51.7579957,
            lng: -1.2354382,
            focus: true,
            //message: "Hey, drag me if you want",
            title: "Marker",
            draggable: true,
            label: {
                message: "Hey, drag me if you want",
                options: {
                    noHide: true
                }
            }
        }
    };
})

.controller('DashCtrl', function ($scope) {})

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