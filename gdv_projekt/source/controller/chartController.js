(function(angular) {
	'use strict';

	function ChartController($rootScope, $scope, countryService, restService) {
		
		$scope.$on("selectedCountries:updated", function(){
			var index = 1;
			angular.forEach(countryService.getSelectedCountries(), function(languageVersion,k){
				initPiechart(countryService.getCountry(languageVersion), index++);
			});
		});

		function initPiechart(country, index) {
			google.charts.load("current", {"packages" : [ "corechart" ]});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
				var cars = [];
				cars.push(["Automarke" , "Klicks"]);
			
				angular.forEach(country["cars"], function(car, k){
					angular.forEach(car, function(articles, brand){
						var views = 0;
						
						angular.forEach(articles, function(article, k){
							angular.forEach(article.months, function(month, k){
								views += month.views;
							});
						});
						
						cars.push([brand, views])
					})
				});
				
				var data = google.visualization.arrayToDataTable(cars);

				var options = {
					title : country.name,
					titleTextStyle : {color: "#FFFFFF", fontName : "Montserrat"},
					backgroundColor : "#000000",
					width: 500,
					height: 500,
					legend : "none",
					colors:["#22AA99", "#4cad9d", "#6aa99b", "#87a79b", "#0f9c93"]
				};

				new google.visualization.PieChart(document.getElementById("piechart" + index)).draw(data, options);
			}
		}
	}

	var app = angular.module("gdvProjekt");
	app.controller("ChartController", [ '$rootScope', '$scope', 'countryService', 'restService',
			ChartController ]);

})(window.angular);