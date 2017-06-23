(function(angular) {
	"use strict";
	

	
	function BrandController($rootScope, $scope, imageService) {
		
		$scope.images_all = imageService.getAllImages();
		
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("BrandController", [ '$rootScope', '$scope', 'imageService' , BrandController ]);

})(window.angular);