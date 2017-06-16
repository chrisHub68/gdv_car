(function(angular) {
	'use strict';

	function ChartController($rootScope, $scope, countryService, restService) {
		
		var barchart, barchartData, barchartOptions, linechart, linechartData, linechartOptions;
		
		$scope.selectedBrands = [];
		
		$scope.loadCountries = function(){
			var index = 1;
			angular.forEach(countryService.getSelectedCountries(), function(languageVersion,k){
				initPiechart(countryService.getCountry(languageVersion), index++);
			});
		}
		
		$scope.$watch("selectedBrands", function(){
			if($scope.selectedBrands.length > 0 && $scope.selectedBrands.length <= 2){
				drawBarchart();
				drawLinechart();
			}
		}, true);
		
		
		// PIE CHART

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
					chartArea : {'width': '80%', 'height': '100%'},
					backgroundColor : "#000000",
					legend : "none",
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
		
		// BAR CHART
		
		$scope.initBarchart = function() {
			barchartOptions = {
					chart: { title: "Aufrufzahlen" },
					backgroundColor : "#000000" ,
					animation: { duration: 1000, easing: "out" },
			        height: "100%",
			        width: "100%",
			        colors:["#22AA99", "#62AA99"],
			        hAxis: {
			            minValue: 0,
			            maxValue: 2500000
			        }
			};
			
			google.charts.load('current', {packages: ['corechart', 'bar']});
			google.charts.setOnLoadCallback(function(){barchart = new google.visualization.BarChart(document.getElementById("barchart1")); drawBarchart()});
		}	
		
		function drawBarchart() {
			var brands = [];
			
			if($scope.selectedBrands.length == 0)
				brands.push(["Land", ""], ["Deutsch", 0], ["Italienisch", 0], ["Japanisch", 0], ["Franzoesisch", 0], ["Englisch", 0]);
			
			if($scope.selectedBrands.length == 1) 
				brands.push(["Land", $scope.selectedBrands[0]], ["Deutsch", 0], ["Italienisch", 0], ["Japanisch", 0], ["Franzoesisch", 0], ["Englisch", 0]);
			
			if($scope.selectedBrands.length == 2)
				brands.push(["Land", $scope.selectedBrands[0] , $scope.selectedBrands[1]], ["Deutsch", 0 , 0], ["Italienisch", 0, 0], ["Japanisch", 0, 0], ["Franzoesisch", 0], ["Englisch", 0]);

			
			angular.forEach($scope.selectedBrands, function(brand, index){
				index++;
				angular.forEach(countryService.getBrand(brand), function(article, key){
					
					var views = 0;
					
					angular.forEach(article.months, function(month,k){
						views += month.views;
					}); 
					
					for (var i = 1; i < brands.length; i++) {
						if(article.languageVersion == "de") brands[1][index] = views;
						if(article.languageVersion == "it") brands[2][index] = views;
						if(article.languageVersion == "ja") brands[3][index] = views;
						if(article.languageVersion == "fr") brands[4][index] = views;
						if(article.languageVersion == "en") brands[5][index] = views;
					}
				});
			});
			
			barchart.draw(google.visualization.arrayToDataTable(brands), barchartOptions);			
		}
		
		// LINE CHART
		
		$scope.initLinechart = function(){
			linechartOptions = {
					backgroundColor : "#000000" ,
					animation: { duration: 1000, easing: "out" },
			        height: "100%",
			        width: "100%",
			        colors:["#22AA99", "#62AA99"],
			        vAxis : {minValue : 0}
			}
			
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.charts.setOnLoadCallback(function(){ linechart = new google.visualization.LineChart(document.getElementById("linechart1")); drawLinechart()});
		}
		
		function drawLinechart() {
			var brands = [];
			
			if($scope.selectedBrands.length == 0)
				brands.push(["Monat", ""], ["Januar", 0], ["Februar", 0], ["März", 0], ["April", 0], ["Mai", 0], ["Juni", 0], ["Juli", 0], ["August", 0], 
						["September", 0], ["Oktober", 0], ["November", 0], ["Dezember", 0]);
			
			if($scope.selectedBrands.length == 1) 
				brands.push(["Monat", $scope.selectedBrands[0]], ["Januar", 0], ["Februar", 0], ["März", 0], ["April", 0], ["Mai", 0], ["Juni", 0], 
						["Juli", 0], ["August", 0], ["September", 0], ["Oktober", 0], ["November", 0], ["Dezember", 0]);
			
			if($scope.selectedBrands.length == 2)
				brands.push(["Land", $scope.selectedBrands[0] , $scope.selectedBrands[1]], ["Januar", 0], ["Februar", 0], ["März", 0], ["April", 0], 
						["Mai", 0], ["Juni", 0], ["Juli", 0], ["August", 0], ["September", 0], ["Oktober", 0], ["November", 0], ["Dezember", 0]);
			

			angular.forEach($scope.selectedBrands, function(brand, index){
				index++;
				angular.forEach(countryService.getBrand(brand), function(article, key){
					console.log(article)
					for (var i = 0; i < article.months.length; i++) {
						brands[i + 1][index] += article.months[i].views;
					}
				});
			});
			
			
			linechart.draw(google.visualization.arrayToDataTable(brands), linechartOptions);
		}
	}

	var app = angular.module("gdvProjekt");
	app.controller("ChartController", [ '$rootScope', '$scope', 'countryService', 'restService',
			ChartController ]);

})(window.angular);