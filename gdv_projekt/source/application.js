(function(angular) {
	"use strict";

	var app = angular.module("gdvProjekt", [ 'ngRoute' , 'ui.bootstrap' ]);

	app.config(function($routeProvider, $locationProvider) {

		$routeProvider.otherwise({
			redirectTo : '/home'
		});

		$routeProvider.when('/', {
			redirectTo : '/home',
		});

		$routeProvider.when('/home', {
			templateUrl : 'views/home.html',
			controller : "HomeController"
		});
	});

	app.run(function($rootScope, $location, $route) {

	});

})(window.angular);