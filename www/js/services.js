'use strict';

angular.module('starter.services', [])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('AppPostion', function (APP_CONTEXT, AppLog, $q, $interval, $cordovaGeolocation) {
    var defaultPosition = {
            lat: 51.7579957,
            lng: -1.2354382
        },
        myPosition = angular.copy(defaultPosition),
        service = {
            callback: null
        };

    if (window.cordova) {
        AppLog.debug('real position');
        $cordovaGeolocation.watchPosition({
            frequency: 3000,
            timeout: 9000,
            enableHighAccuracy: false // may cause errors if true
        }).then(
            null,
            function (err) {
                AppLog.debug(err);
            },
            function (position) {
                AppLog.debug(position);

                myPosition.lat = position.coords.latitude
                myPosition.long = position.coords.longitude

                if (angular.isFunction(service.callback)) {
                    service.callback(myPosition);
                }
            });
    } else {
        AppLog.debug('simulate position');
        $interval(function () {
            myPosition.lat = defaultPosition.lat + (Math.random() > 0.5 ? 1 : -1) * Math.random() / 10000;
            myPosition.lng = defaultPosition.lng + (Math.random() > 0.5 ? 1 : -1) * Math.random() / 10000;

            if (angular.isFunction(service.callback)) {
                service.callback(myPosition);
            }

        }, 3000);
    };

    service.getPosition = function () {
        return myPosition;
    };

    service.getDefaultPosition = function () {
        return defaultPosition;
    };

    return service;
});