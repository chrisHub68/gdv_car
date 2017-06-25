(function(angular) {
	'use strict';

	function TooltipController($rootScope,$scope,countryService, imageService) {
		$scope.source = "";
		$scope.name = "Mercedes Benz";
		$scope.languageVersion = "";
		$scope.flagClass = "";
		$scope.views = 0;
		$scope.left = "-200px";
		
		$scope.$on("brand:hovered", function(event, value){
			$scope.source = "";
			$scope.name = "";
			$scope.languageVersion = "";
			$scope.flagClass = "";
			$scope.views = 0;
			$scope.left = "0px";
			
			$scope.$applyAsync(function(){
				$scope.name = value.brandName;
				console.log($scope.name)
				$scope.languageVersion = value.languageVersion;
				$scope.source = imageService.getImageURL(value.brandName);
				
				if(value.languageVersion == "ja") value.languageVersion = "jp";
				
				$scope.flagClass = "flag-icon flag-icon-" + value.languageVersion +  " brand-origin-flag";
				
				angular.forEach(countryService.getBrandLanguageValues(value.brandName), function(v,k){
					$scope.views += v;
				});
			});		
		});
		
		$scope.$on("brand:out", function(){
			setTimeout(function(){},1000)
			$socpe.applyAsync(function(){
				$scope.source = "";
				$scope.name = "";
				$scope.languageVersion = "";
				$scope.flagClass = "";
				$scope.views = 0;
				$scope.left = "-200px";
			});
		});
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("TooltipController", ['$rootScope','$scope', 'countryService','imageService', TooltipController]);
	
})(window.angular);