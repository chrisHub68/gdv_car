(function(angular) {
	'use strict';

	function TooltipController($rootScope,$scope) {
		$scope.source = "assets/img/brands/Mercedes-Benz.jpg";
		$scope.name = "Mercedes Benz";
		$scope.views = "1544221";
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("TooltipController", ['$rootScope','$scope', TooltipController]);
	
})(window.angular);