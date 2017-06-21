(function(angular) {
	'use strict';
	
	var languageVersions = ["de", "it", "ja", "fr"];
	var languageColors = {1 :"#e6c603", 2:"#31961c",3:"#ad1818",4:"#3334dc"};
	var versionColors = {"de" :"#e6c603", "it":"#31961c", "ja":"#ad1818", "fr":"#3334dc"};

	function ChartController($rootScope, $scope, countryService, restService) {
		
		$scope.selectedBrands = [];

		// PIE CHART
		$rootScope.$on("countries:loaded", function(){
			for (var index = 0; index < languageVersions.length; index++) {
				initPieChart(index + 1, languageVersions[index]);
			}
		});
		
		function initPieChart(index, languageVersion) {
			var country = countryService.getCountry(languageVersion);

			google.charts.load("current", {"packages" : [ "corechart" ]});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {
				var cars = [];
				cars.push(["Automarke" , "Klicks"]);
			
				angular.forEach(country["cars"], function(car, k){
					angular.forEach(car, function(articles, brand){
						var views = 0;
						
						angular.forEach(articles, function(article, k){
							if(article.languageVersion != "en") {
								angular.forEach(article.months, function(month, k){
									views += month.views;
								});
							}
						});
						
						cars.push([brand, views])
					})
				});
				
				
				var data = google.visualization.arrayToDataTable(cars);
				
				var color = [];
				color.push(versionColors[languageVersion]);

				var options = {
					chartArea : {'width': '80%', 'height': '100%'},
					backgroundColor : {fill:"#000000"},
					legend : "none",
					colors:[color],
					pieSliceText: 'label',
					pieHole: "0.4", 
					tooltip: { trigger: 'none' }
				};
				
				function selectHandler() {
				     
					var selectedItem = chart.getSelection()[0];

		    	       if (selectedItem) {
		    	    	   var topping = data.getValue(selectedItem.row, 0);
				    	         console.log(topping);
		    	       }
				}

				var chart = new google.visualization.PieChart(document.getElementById("piechart" + index));
				chart.draw(data, options);
				google.visualization.events.addListener(chart, "select" , selectHandler);
			}
		}
		
		// Column CHART
		
		$scope.initColumnChart = function(number, language) {
			
			var colors = [];
			colors.push(languageColors[number]);
			
			var columnchartOptions = {
					chart: { title: "Aufrufzahlen" },
					backgroundColor : "#000000" ,
					animation: { duration: 1000, easing: "out" },
			        height: "270",
			        width: "300",	
			        colors: colors,
			        legend: "none", 
			        bar: { groupWidth: "8" },
			        hAxis: {
			        	textPosition: 'none' 
			        },
			        vAxis: {
			        	minValue: 0,
			            maxValue: 1000000,
			            gridlines: { count: 3, color: "#403f3f" },
			            baselineColor: "#403f3f",
			        	textStyle:{color: '#FFF'},
			        	viewWindow : {
			        		minValue: 0,
				            maxValue: 800000,
			        	},
			        
				       ticks : [0, 200000, 400000, 600000, 800000],
				       textStyle:{color: '#FFF'},
			        }
			        
			};
			
			var columnchart;
			
			google.charts.load('current', {packages: ['corechart', 'bar']});
			google.charts.setOnLoadCallback(function(){columnchart = new google.visualization.ColumnChart(document.getElementById("columnchart_" + language + "_" + number)); drawColumnChart(columnchart, "columnchart_" + language + "_" + number, columnchartOptions)});
		}	
		
		function drawColumnChart(columnchart, chartID, columnchartOptions) {
			
			var brands = [];

			switch(chartID) {
			
			case "columnchart_de_1" : brands.push(["Land", "Marken"], ["Audi", countryService.getBrandLanguageValues("Audi").de], ["Opel", countryService.getBrandLanguageValues("Opel").de], 
												  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").de], ["VW", countryService.getBrandLanguageValues("VW").de], 
												  ["Smart", countryService.getBrandLanguageValues("Smart").de], ["Porsche", countryService.getBrandLanguageValues("Porsche").de], 
												  ["BMW", countryService.getBrandLanguageValues("BMW").de]); break;
												  
			case "columnchart_de_2" : brands.push(["Land", "Marken"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").de], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").de], 
												  ["Fiat", countryService.getBrandLanguageValues("Fiat").de], ["Lancia", countryService.getBrandLanguageValues("Lancia").de], 
												  ["Maserati", countryService.getBrandLanguageValues("Maserati").de], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").de], 
												  ["Pagani", countryService.getBrandLanguageValues("Pagani").de]); break;
			
			
			case "columnchart_de_3" : brands.push(["Land", "Marken"], ["Honda", countryService.getBrandLanguageValues("Honda").de], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").de], 
												  ["Nissan", countryService.getBrandLanguageValues("Nissan").de], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").de], 
												  ["Toyota", countryService.getBrandLanguageValues("Toyota").de], ["Acura", countryService.getBrandLanguageValues("Acura").de], 
												  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").de], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").de], 
												  ["Isuzu", countryService.getBrandLanguageValues("Isuzu").de], ["Mazda", countryService.getBrandLanguageValues("Mazda").de], 
												  ["Acura", countryService.getBrandLanguageValues("Acura").de]); break;
			
			
			case "columnchart_de_4" : brands.push(["Land", "Marken"], ["Ligier", countryService.getBrandLanguageValues("Ligier").de], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").de], 
												  ["Renault", countryService.getBrandLanguageValues("Renault").de], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").de], 
												  ["Citroën", countryService.getBrandLanguageValues("Citroën").de]); break;
			
			
			case "columnchart_it_1" : brands.push(["Land", "Marken"], ["Audi", countryService.getBrandLanguageValues("Audi").it], ["Opel", countryService.getBrandLanguageValues("Opel").it], 
												  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").it], ["VW", countryService.getBrandLanguageValues("VW").it], 
												  ["Smart", countryService.getBrandLanguageValues("Smart").it], ["Porsche", countryService.getBrandLanguageValues("Porsche").it], 
												  ["BMW", countryService.getBrandLanguageValues("BMW").it]); break;
												  
			case "columnchart_it_2" : brands.push(["Land", "Marken"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").it], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").it], 
												  ["Fiat", countryService.getBrandLanguageValues("Fiat").it], ["Lancia", countryService.getBrandLanguageValues("Lancia").it], 
												  ["Maserati", countryService.getBrandLanguageValues("Maserati").it], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").it], 
												  ["Pagani", countryService.getBrandLanguageValues("Pagani").it]); break;
			
			case "columnchart_it_3" : brands.push(["Land", "Marken"], ["Honda", countryService.getBrandLanguageValues("Honda").it], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").it], 
												  ["Nissan", countryService.getBrandLanguageValues("Nissan").it], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").it], 
												  ["Toyota", countryService.getBrandLanguageValues("Toyota").it], ["Acura", countryService.getBrandLanguageValues("Acura").it], 
												  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").it], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").it], 
												  ["Isuzu", countryService.getBrandLanguageValues("Isuzu").it], ["Mazda", countryService.getBrandLanguageValues("Mazda").it], 
												  ["Acura", countryService.getBrandLanguageValues("Acura").it]); break;
						
			case "columnchart_it_4" : brands.push(["Land", "Marken"], ["Ligier", countryService.getBrandLanguageValues("Ligier").it], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").it], 
												  ["Renault", countryService.getBrandLanguageValues("Renault").it], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").it], 
												  ["Citroën", countryService.getBrandLanguageValues("Citroën").it]); break;
			
			
			case "columnchart_ja_1" : brands.push(["Land", "Marken"], ["Audi", countryService.getBrandLanguageValues("Audi").ja], ["Opel", countryService.getBrandLanguageValues("Opel").ja], 
												  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").ja], ["VW", countryService.getBrandLanguageValues("VW").ja], 
												  ["Smart", countryService.getBrandLanguageValues("Smart").ja], ["Porsche", countryService.getBrandLanguageValues("Porsche").ja], 
												  ["BMW", countryService.getBrandLanguageValues("BMW").ja]); break;
												  
			case "columnchart_ja_2" : brands.push(["Land", "Marken"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").ja], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").ja], 
												  ["Fiat", countryService.getBrandLanguageValues("Fiat").ja], ["Lancia", countryService.getBrandLanguageValues("Lancia").ja], 
												  ["Maserati", countryService.getBrandLanguageValues("Maserati").ja], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").ja], 
												  ["Pagani", countryService.getBrandLanguageValues("Pagani").ja]); break;
			
			case "columnchart_ja_3" : brands.push(["Land", "Marken"], ["Honda", countryService.getBrandLanguageValues("Honda").ja], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").ja], 
												  ["Nissan", countryService.getBrandLanguageValues("Nissan").ja], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").ja], 
												  ["Toyota", countryService.getBrandLanguageValues("Toyota").ja], ["Acura", countryService.getBrandLanguageValues("Acura").ja], 
												  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").ja], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").ja], 
												  ["Isuzu", countryService.getBrandLanguageValues("Isuzu").ja], ["Mazda", countryService.getBrandLanguageValues("Mazda").ja], 
												  ["Acura", countryService.getBrandLanguageValues("Acura").ja]); break;
							
			case "columnchart_ja_4" : brands.push(["Land", "Marken"], ["Ligier", countryService.getBrandLanguageValues("Ligier").ja], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").ja], 
												  ["Renault", countryService.getBrandLanguageValues("Renault").ja], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").ja], 
												  ["Citroën", countryService.getBrandLanguageValues("Citroën").ja]); break;
			
			
			case "columnchart_fr_1" : brands.push(["Land", "Marken"], ["Audi", countryService.getBrandLanguageValues("Audi").fr], ["Opel", countryService.getBrandLanguageValues("Opel").fr], 
												  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").fr], ["VW", countryService.getBrandLanguageValues("VW").fr], 
												  ["Smart", countryService.getBrandLanguageValues("Smart").fr], ["Porsche", countryService.getBrandLanguageValues("Porsche").fr], 
												  ["BMW", countryService.getBrandLanguageValues("BMW").fr]); break;
												  
			case "columnchart_fr_2" : brands.push(["Land", "Marken"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").fr], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").fr], 
												  ["Fiat", countryService.getBrandLanguageValues("Fiat").fr], ["Lancia", countryService.getBrandLanguageValues("Lancia").fr], 
												  ["Maserati", countryService.getBrandLanguageValues("Maserati").fr], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").fr], 
												  ["Pagani", countryService.getBrandLanguageValues("Pagani").fr]); break;
									  
			case "columnchart_fr_3" : brands.push(["Land", "Marken"], ["Honda", countryService.getBrandLanguageValues("Honda").fr], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").fr], 
												  ["Nissan", countryService.getBrandLanguageValues("Nissan").fr], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").fr], 
												  ["Toyota", countryService.getBrandLanguageValues("Toyota").fr], ["Acura", countryService.getBrandLanguageValues("Acura").fr], 
												  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").fr], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").fr], 
												  ["Lexus", countryService.getBrandLanguageValues("Lexus").fr], ["Mazda", countryService.getBrandLanguageValues("Mazda").fr], 
												  ["Acura", countryService.getBrandLanguageValues("Acura").fr]); break;
			
			case "columnchart_fr_4" : brands.push(["Land", "Marken"], ["Ligier", countryService.getBrandLanguageValues("Ligier").fr], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").fr], 
												  ["Renault", countryService.getBrandLanguageValues("Renault").fr], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").fr], 
												  ["Citroën", countryService.getBrandLanguageValues("Citroën").fr]); break;
			
			 
												  
			}
			
			columnchart.draw(google.visualization.arrayToDataTable(brands), columnchartOptions);
		}
	}
	var app = angular.module("gdvProjekt");
	app.controller("ChartController", [ '$rootScope', '$scope', 'countryService', 'restService',
			ChartController ]);

})(window.angular);