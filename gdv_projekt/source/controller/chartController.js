(function(angular) {
	'use strict';

	function ChartController($rootScope, $scope, JSONService) {

		function initBarchart(containerName, country) {
			google.charts.load("current", {"packages" : [ "corechart" ]});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
				var cars = {};
				angular.forEach(country.cars, function(k,v){
					// .....
				});
				
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

				new google.visualization.PieChart(document.getElementById(containerName + "Piechart")).draw(data, options);
			}
		}
	}

	var app = angular.module("gdvProjekt");
	app.controller("ChartController", [ '$rootScope', '$scope', 'JSONService',
			ChartController ]);

})(window.angular);