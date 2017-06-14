(function(angular) {
	'use strict';

	function ChartController($rootScope, $scope, countryService, restService) {
		
		$scope.$on("selectedCountries:updated", function(){

		});

		function initPiechart() {
			google.charts.load("current", {"packages" : [ "corechart" ]});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
				var cars = [];
				cars.push(["Automarke" , "Klicks"]);
			
				
				var data = google.visualization.arrayToDataTable([
						[ 'Task', 'Hours per Day' ], [ 'Work', 11 ],
						[ 'Eat', 2 ], [ 'Commute', 2 ], [ 'Watch TV', 2 ],
						[ 'Sleep', 7 ] ]);

				var options = {
					title : country.name.charAt(0).toUpperCase() + country.name.slice(1),
					titleTextStyle : {color: "#FFFFFF", fontName : "Montserrat"},
					backgroundColor : "#000000",
					width: 500,
					height: 500,
					legend : "none",
					colors:["#22AA99", "#4cad9d", "#6aa99b", "#87a79b", "#0f9c93"]
				};
				new google.visualization.PieChart(document.getElementById("piechart" + ++index)).draw(data, options);
			}
		}
	}

	var app = angular.module("gdvProjekt");
	app.controller("ChartController", [ '$rootScope', '$scope', 'countryService', 'restService',
			ChartController ]);

})(window.angular);