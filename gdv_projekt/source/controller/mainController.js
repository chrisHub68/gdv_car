(function(angular) {
	'use strict';

	function MainController($rootScope,$scope) {
		
		$scope.hallo = "hello";
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("MainController", ['$rootScope','$scope', MainController]);
	
})(window.angular);