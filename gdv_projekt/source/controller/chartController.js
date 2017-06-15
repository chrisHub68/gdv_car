(function(angular) {
	'use strict';

	function ChartController($rootScope, $scope, countryService, restService) {
		
		$scope.selectedBrands = [];
		
		$scope.$on("selectedCountries:updated", function(){
			var index = 1;
			angular.forEach(countryService.getSelectedCountries(), function(languageVersion,k){
				initPiechart(countryService.getCountry(languageVersion), index++);
			});
		});
		
		$scope.$watch("selectedBrands", function(){
			if($scope.selectedBrands.length > 0) initBarchart();
		}, true);

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
					legend : "none",
					width: "100%",
					height: "100%",
					chartArea:{top:0},
					colors:["#22AA99"]
				};
				
				function selectHandler() {
			        var brand = data.getValue(chart.getSelection()[0].row, 0);
			        $scope.$applyAsync(function(){
						$.inArray(brand, $scope.selectedBrands) > -1 ? $scope.selectedBrands.splice($scope.selectedBrands.indexOf(brand),1) 
								: $scope.selectedBrands.push(brand);
			        });
			        chart.setSelection();
				}

				var chart = new google.visualization.PieChart(document.getElementById("piechart" + index));
				chart.draw(data, options);
				google.visualization.events.addListener(chart, "select" , selectHandler);
			}
		}
		

		function initBarchart() {
			google.charts.load('current', {packages: ['corechart', 'bar']});
			google.charts.setOnLoadCallback(drawChart);
			
			function drawChart() {
				var cars = [];
				
				if($scope.selectedBrands.length == 1) 
					cars.push(["Land", $scope.selectedBrands[0]], ["Deutsch", 0], ["Italienisch", 0], ["Japanisch", 0], ["Franzoesisch", 0], ["Englisch", 0]);
				
				if($scope.selectedBrands.length == 2)
					cars.push(["Land", $scope.selectedBrands[0] , $scope.selectedBrands[1]], ["Deutsch", 0 , 0], ["Italienisch", 0, 0], ["Japanisch", 0, 0], ["Franzoesisch", 0], ["Englisch", 0]);

				
				angular.forEach($scope.selectedBrands, function(brand, index){
					index++;
					angular.forEach(countryService.getBrand(brand), function(article, key){
						console.log(article);
						
						var views = 0;
						
						angular.forEach(article.months, function(month,k){
							views += month.views;
							console.log(views);
						}); 
						
						for (var i = 1; i < cars.length; i++) {
							
							if(article.languageVersion == "de") cars[1][1] = views;
							if(article.languageVersion == "it") cars[2][1] = views;
							if(article.languageVersion == "ja") cars[3][1] = views;
							if(article.languageVersion == "fr") cars[4][1] = views;
							if(article.languageVersion == "en") cars[5][1] = views;
						}
					});
				});
				
				console.log(cars)

			    var data = google.visualization.arrayToDataTable(cars);

				var options = {
			        title: "hallo",
					backgroundColor : "#000000",
			        height: "100%",
			        width: "100%",
			        colors:["#22AA99"]
			    };

				new google.visualization.BarChart(document.getElementById("barchart1")).draw(data, options);
			}
		}	
	}

	var app = angular.module("gdvProjekt");
	app.controller("ChartController", [ '$rootScope', '$scope', 'countryService', 'restService',
			ChartController ]);

})(window.angular);