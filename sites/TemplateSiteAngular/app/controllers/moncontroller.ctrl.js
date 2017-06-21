'use strict';

angular.module('monappangular').controller('MonController', ['$scope', '$http',
    function ($scope, $http) {
	
		$scope.mavaleur = "une valeur sur mon ctrl 1";
	
	$scope.jdd = {
			url: 'http://bignou.fr',
			title: 'BIGNOU'
		};
		
	}]);