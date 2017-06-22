(function(angular) {
	'use strict';

	function TooltipController($rootScope,$scope,countryService) {
		$scope.source = "assets/img/brands/Mercedes-Benz.jpg";
		$scope.name = "Mercedes Benz";
		$scope.languageVersion = "";
		$scope.flagClass = "";
		$scope.views = 0;
		
		$scope.$on("brand:hovered", function(event, value){
			$scope.source = "";
			$scope.name = "";
			$scope.languageVersion = "";
			$scope.flagClass = "";
			$scope.views = 0;
			
			$scope.$applyAsync(function(){
				$scope.name = value.brandName;
				$scope.languageVersion = value.languageVersion;
				
				if(value.languageVersion == "ja") value.languageVersion = "jp";
				
				$scope.flagClass = "flag-icon flag-icon-" + value.languageVersion +  " brand-origin-flag";
				
				angular.forEach(countryService.getBrandLanguageValues(value.brandName), function(v,k){
					$scope.views += v;
				});
			});
		});
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("TooltipController", ['$rootScope','$scope', 'countryService', TooltipController]);
	
})(window.angular);