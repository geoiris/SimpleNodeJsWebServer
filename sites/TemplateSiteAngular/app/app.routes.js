'use strict';

angular.module('monappangular').config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/",
        {
            templateUrl: 'app/views/mavue.html',
            controller: "MonController"
        }
    );
    
    $routeProvider.when("/deux",
        {
            templateUrl: 'app/views/mavuedeux.html',
            controller: "MonControllerDeux"
        }
    );

    $routeProvider.otherwise({ redirectTo: '/' });
} ]);