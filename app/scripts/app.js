 (function() {
    'use strict';
    var app = angular.module('newAngularApp', ['ngResource', 'ngRoute', 'ui.date']);
 
    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/login.html',
				controller: 'LoginCtrl'
            })
            .when('/createpatient', {
                templateUrl: 'app/views/create_patient.html',
				controller: 'PatientCtrl'
            })
            .when('/createprofessional', {
                templateUrl: 'app/views/create_professional.html',
				controller: 'ProfessionalCtrl'
            })
            .when('/creategroup', {
                templateUrl: 'app/views/create_group.html',
                controller: 'GroupCtrl'
            })
            .when('/listgroup', {
                templateUrl: 'app/views/list_group.html',
                controller: 'ListGroupCtrl'
            })
            .when('/editgroup/:id', {
                templateUrl: 'app/views/edit_group.html',
                controller: 'GroupEditCtrl'
            })
            .when('/userlist', {
                templateUrl: 'app/views/userlist.html',
				controller: 'MainCtrl'
            })
            .when('/getuser', {
                templateUrl: 'app/views/get_user_profile.html',
				controller: 'UserCtrl'
            })
            .when('/editprofessional/:id', {
                templateUrl: 'app/views/create_professional.html',
                controller: 'ProfessionalEditCtrl'
            })
            .when('/editpatient/:id', {
                templateUrl: 'app/views/create_patient.html',
                controller: 'PatientEditCtrl'
            })
            .when('/home', {
                templateUrl: 'app/views/home.html',
				controller: 'HomeCtrl'
            })
            .when('/loaddatafromnpi', {
                templateUrl: 'app/views/loaddatafromnpi.html',
                controller: 'NPICtrl'
            })
            .when('/restapi', {
                templateUrl: 'app/views/swagger.html',
                controller: 'SwaggerCtrl'
            })
            .when('/elasticrestapi', {
                templateUrl: 'app/views/swagger-elastic.html'
            })            
			.otherwise({
                redirectTo: '/'
            });
    });
    app.config(function($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
    app.run(function($rootScope, $location, AuthenticationService) {
        $rootScope.$on('$routeChangeStart', function() {
            if($location.path() !=='/restapi') {
                if (AuthenticationService.isLoggedIn()) {

                    $rootScope.Authenticated = true;
                } else {
                    $rootScope.Authenticated = false;
                    $location.path('/');
                }               
            }

        });
    });
}());