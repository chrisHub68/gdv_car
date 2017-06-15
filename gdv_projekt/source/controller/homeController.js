(function(angular) {
	'use strict';

	function HomeController($rootScope, $scope, countryService) {

		// VIEW
		
		function collapseNavbar() {
			if (angular.element(".navbar").offset().top > 50) {
				angular.element(".navbar-fixed-top").addClass("top-nav-collapse");
			} else {
				angular.element(".navbar-fixed-top").removeClass("top-nav-collapse");
			}
		}

		angular.element(function() {
			angular.element('a.page-scroll').bind('click', function(event) {
				var $anchor = angular.element(this);
				angular.element('html, body').stop().animate({
					scrollTop : angular.element($anchor.attr('href')).offset().top
				}, 1500, 'easeInOutExpo');
				event.preventDefault();
			});
		});

		angular.element('.navbar-collapse ul li a').click(function() {
			angular.element(".navbar-collapse").collapse('hide');
		});
		
		angular.element(window).scroll(collapseNavbar);
		angular.element(document).ready(collapseNavbar);
		
		
		// SELECT COUNTRY
		
		$scope.selectedCountries = [];
		$scope.selectedBrands = ["hallo"];
		$scope.countriesLoaded = false;
		
		function getSelectedCountries(){
			$scope.selectedCountries = countryService.getSelectedCountries();
		}
		
		$scope.setSelectedCountry = function(country){
			countryService.setSelectedCountry(country);
		}
		
		$scope.containsCountry = function containsCountry(country){
			return $.inArray(country, $scope.selectedCountries) < 0 ? false : true;
		}
		
		$scope.loadCountries = function(){
			$scope.countriesLoaded = true;
		}
		
		$scope.$watch("selectedCountries", function(){
			if($scope.selectedCountries.length == 0) $scope.countriesLoaded = false;
		}, true);
		
		$scope.$on("selectedCountries:updated", function(){
			getSelectedCountries();
		});
		
	}

	var app = angular.module("gdvProjekt");
	app.controller("HomeController", [ '$rootScope', '$scope', 'countryService', HomeController ]);

})(window.angular);