(function(angular) {
	'use strict';

	function TooltipController($rootScope,$scope,countryService,imageService) {
		$scope.source = "";
		$scope.name = "";
		$scope.origin = "";
		$scope.click = "";
		$scope.languageVersion = "";
		$scope.language = ""
		$scope.flagClass = "";
		$scope.views = 0;
		$scope.left = "-230px";
		
		$scope.$on("brand:hovered", function(event, value){
			$scope.origin = "Herkunft: ";
			$scope.click = "Gesamtaufrufe: ";
			$scope.languageVersion = "";
			$scope.language = "";
			$scope.flagClass = "";
			$scope.views = 0;
			$scope.left = "0px";
			
			$scope.$applyAsync(function(){
				$scope.name = value.brandName;
				$scope.languageVersion = value.languageVersion;
				$scope.source = imageService.getImageURL(value.brandName);
				$scope.origin += " ";
				
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
				$scope.origin = "";
				$scope.click = "";
				$scope.languageVersion = "";
				$scope.language = "";
				$scope.flagClass = "";
				$scope.views = 0;
				$scope.left = "-230px";
			});
		});
		
		$scope.$on("column:hovered", function(event, value){
			$scope.$applyAsync(function(){
				$scope.origin = "Sprachversion: ";
				$scope.click = "Aufrufe: ";
				$scope.left = "0px";
				$scope.flagClass = "";
				
				$scope.name = value.brandName;
				$scope.source = imageService.getImageURL(value.brandName);
				$scope.language = " " + value.languageVersion.toUpperCase();
				$scope.views = value.brandValue;
			});
		});
		
		$scope.$on("column:out", function(){
			setTimeout(function(){},1000)
			$socpe.applyAsync(function(){
				$scope.left = "-200px";
			});
		});
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("TooltipController", ['$rootScope','$scope', 'countryService','imageService', TooltipController]);
	
})(window.angular);