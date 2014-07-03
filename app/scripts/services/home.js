/*global angular, sessionStorage, $, API_BASE, localStorage, window, Users, FluentXSApi, ActivityApi, ESBApi */
(function() {
    "use strict";

    var app = angular.module('newAngularApp');

    app.factory('ISUrlService', function() {
        return {
            IS_URL: 'https://is.medigy.io/wso2/scim/Users', 
            IS_AUTH_URL: 'https://is.medigy.io/oauth2/token',
            IS_GROUP_URL: 'https://is.medigy.io/wso2/scim/Groups',
            MEDIGY_ESB_URL: 'http://esb.medigy.io',
            ELASTIC_SERVICE_URL: 'http://107.170.78.33:8281/api/npi/professional/'
        };
    });

    app.factory('SessionService', function() {
        return {
            get: function(key) {
                return localStorage.getItem(key);
            }
        };
    });

    app.factory('AuthenticationService', function(SessionService) {
        return {
            isLoggedIn: function() {
                return SessionService.get('username');
            }
        };
    });
}());