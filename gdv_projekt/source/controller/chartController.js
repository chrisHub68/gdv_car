(function(angular) {
	'use strict';
	
	var languageVersions = ["de", "it", "ja", "fr"];
	var languageColors = {1 :"#e6c603", 2:"#31961c",3:"#ad1818",4:"#003fd6"};
	var versionColors = {"de" :"#e6c603", "it":"#31961c", "ja":"#ad1818", "fr":"#003fd6"};

	function ChartController($rootScope, $scope, countryService, restService) {
		
		$scope.selectedBrands = [];
		$scope.selectedSlices = { "de" : [], "it" : [], "ja" : [], "fr": [] };
		$scope.selectedCars = { "de" : [], "it" : [], "ja" : [], "fr": [] };

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
					pieHole: "0.3", 
					tooltip: { trigger: 'none' },
					pieSliceTextStyle: {color: 'black'},
					slices: {}		
				};
				
				for(var i = 0; i < $scope.selectedSlices[languageVersion].length; i++) {
					options.slices[$scope.selectedSlices[languageVersion][i]] = {offset: 0.1};		
				}
			
				
				function selectHandler() {
	     
		    	   var selectedItem = chart.getSelection()[0];
		    	   var selectedItemName = data.getValue(selectedItem.row,0);

		    	       if (selectedItem) {
		    	    	   if($scope.selectedSlices[languageVersion].indexOf(selectedItem.row) == -1) {
		    	    		   $scope.selectedSlices[languageVersion].push(selectedItem.row);
		    	    		   $scope.selectedCars[languageVersion].push(selectedItemName);
		    	    	   } else {
		    	    		   options.slices[$scope.selectedSlices[languageVersion][selectedItem.row]] = {offset: 0};
		    	    		   $scope.selectedSlices[languageVersion].splice($scope.selectedSlices[languageVersion].indexOf(selectedItem.row),1);
		    	    		   $scope.selectedCars[languageVersion].splice($scope.selectedCars[languageVersion].indexOf(selectedItemName),1);
		    	    	   }
		    	    	   
		    	    	   $scope.$watch($scope.selectedCars, function() {
		   					console.log($scope.selectedCars)
		    	    	   });
		    	       }
		    	       chart.getSelection();
		    	       initPieChart(index, languageVersion);
				}
				
				function mouseoverHandler(event){
					if(event.row) $rootScope.$broadcast("brand:hovered" , {brandName:data.getValue(event.row,0), languageVersion:languageVersion});
				}

				var chart = new google.visualization.PieChart(document.getElementById("piechart" + index));
				chart.draw(data, options);
				google.visualization.events.addListener(chart, "select" , selectHandler);
				google.visualization.events.addListener(chart, "onmouseover" , mouseoverHandler);
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
			        colors: colors,
			        legend: "none", 
			        bar: { groupWidth: "8" ,stroke: "#fff",
			              strokeWidth: 1,},
			        tooltip: { trigger: 'none' },
			        enableInteractivity: false,
			        hAxis: {
			        	textPosition: 'none' 
			        },
			        vAxis: {
			        	minValue: 0,
			            maxValue: 1000000,
			            gridlines: { count: 3, color: "#403f3f" },
			            baselineColor: "#FFFFFF",
			        	textStyle:{color: "#af9e9e"},
			        	viewWindow : {
			        		minValue: 0,
				            maxValue: 800000,
			        	},
			        
				       ticks : [0, 200000, 400000, 600000, 800000],
			        },
			        seriesType: 'bars',
			        series: {1: {type: 'line'}},
			    
			        
			};
			
			var columnchart;
			
			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(function(){ columnchart = new google.visualization.ComboChart(document.getElementById("columnchart_" + language + "_" + number));
				drawColumnChart(columnchart, "columnchart_" + language + "_" + number, columnchartOptions)
			});
		
			function getCountryAverage(languageVersion){
				
				var allBrands;
				var tempBrands;
				var result = 0;
				
				allBrands = countryService.getCars();

				
				for(var i = 0; i < Object.keys(allBrands[languageVersion]).length ;i++){

					tempBrands = countryService.getBrandLanguageValues(allBrands[languageVersion][i],languageVersion);					

					result += tempBrands[languageVersion];
				}
				

				
				return result/Object.keys(allBrands[languageVersion]).length;
			}
			
			function drawColumnChart(columnchart, chartID, columnchartOptions) {
				
				var brands = [];

				switch(chartID) {
				
				case "columnchart_de_1" : brands.push(["Land", "Aufrufe","Average"], ["Audi", countryService.getBrandLanguageValues("Audi").de,getCountryAverage("de")], ["Opel", countryService.getBrandLanguageValues("Opel").de,getCountryAverage("de")], 
													  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").de,getCountryAverage("de")], ["VW", countryService.getBrandLanguageValues("VW").de,getCountryAverage("de")], 
													  ["Smart", countryService.getBrandLanguageValues("Smart").de,getCountryAverage("de")], ["Porsche", countryService.getBrandLanguageValues("Porsche").de,getCountryAverage("de")], 
													  ["BMW", countryService.getBrandLanguageValues("BMW").de,getCountryAverage("de")]); break;
													  
				case "columnchart_de_2" : brands.push(["Land", "Aufrufe","Average"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").de,getCountryAverage("de")], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").de,getCountryAverage("de")], 
													  ["Fiat", countryService.getBrandLanguageValues("Fiat").de,getCountryAverage("de")], ["Lancia", countryService.getBrandLanguageValues("Lancia").de,getCountryAverage("de")], 
													  ["Maserati", countryService.getBrandLanguageValues("Maserati").de,getCountryAverage("de")], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").de,getCountryAverage("de")], 
													  ["Pagani", countryService.getBrandLanguageValues("Pagani").de,getCountryAverage("de")]); break;
				
				
				case "columnchart_de_3" : brands.push(["Land", "Aufrufe","Average"], ["Honda", countryService.getBrandLanguageValues("Honda").de,getCountryAverage("de")], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").de,getCountryAverage("de")], 
													  ["Nissan", countryService.getBrandLanguageValues("Nissan").de,getCountryAverage("de")], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").de,getCountryAverage("de")], 
													  ["Toyota", countryService.getBrandLanguageValues("Toyota").de,getCountryAverage("de")], ["Acura", countryService.getBrandLanguageValues("Acura").de,getCountryAverage("de")], 
													  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").de,getCountryAverage("de")], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").de,getCountryAverage("de")], 
													  ["Isuzu", countryService.getBrandLanguageValues("Isuzu").de,getCountryAverage("de")], ["Mazda", countryService.getBrandLanguageValues("Mazda").de,getCountryAverage("de")], 
													  ["Acura", countryService.getBrandLanguageValues("Acura"),getCountryAverage("de")]); break;
				
				
				case "columnchart_de_4" : brands.push(["Land", "Aufrufe","Average"], ["Ligier", countryService.getBrandLanguageValues("Ligier").de,getCountryAverage("de")], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").de,getCountryAverage("de")], 
													  ["Renault", countryService.getBrandLanguageValues("Renault").de,getCountryAverage("de")], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").de,getCountryAverage("de")], 
													  ["Citroën", countryService.getBrandLanguageValues("Citroën").de,getCountryAverage("de")]); break;
				
				
				case "columnchart_it_1" : brands.push(["Land", "Aufrufe","Average"], ["Audi", countryService.getBrandLanguageValues("Audi").it,getCountryAverage("it")], ["Opel", countryService.getBrandLanguageValues("Opel").it,getCountryAverage("it")], 
													  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").it,getCountryAverage("it")], ["VW", countryService.getBrandLanguageValues("VW").it,getCountryAverage("it")], 
													  ["Smart", countryService.getBrandLanguageValues("Smart").it,getCountryAverage("it")], ["Porsche", countryService.getBrandLanguageValues("Porsche").it,getCountryAverage("it")], 
													  ["BMW", countryService.getBrandLanguageValues("BMW").it,getCountryAverage("it")]); break;
													  
				case "columnchart_it_2" : brands.push(["Land", "Aufrufe","Average"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").it,getCountryAverage("it")], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").it,getCountryAverage("it")], 
													  ["Fiat", countryService.getBrandLanguageValues("Fiat").it,getCountryAverage("it")], ["Lancia", countryService.getBrandLanguageValues("Lancia").it,getCountryAverage("it")], 
													  ["Maserati", countryService.getBrandLanguageValues("Maserati").it,getCountryAverage("it")], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").it,getCountryAverage("it")], 
													  ["Pagani", countryService.getBrandLanguageValues("Pagani").it,getCountryAverage("it")]); break;
				
				case "columnchart_it_3" : brands.push(["Land", "Aufrufe","Average"], ["Honda", countryService.getBrandLanguageValues("Honda").it,getCountryAverage("it")], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").it,getCountryAverage("it")], 
													  ["Nissan", countryService.getBrandLanguageValues("Nissan").it,getCountryAverage("it")], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").it,getCountryAverage("it")], 
													  ["Toyota", countryService.getBrandLanguageValues("Toyota").it,getCountryAverage("it")], ["Acura", countryService.getBrandLanguageValues("Acura").it,getCountryAverage("it")], 
													  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").it,getCountryAverage("it")], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").it,getCountryAverage("it")], 
													  ["Isuzu", countryService.getBrandLanguageValues("Isuzu").it,getCountryAverage("it")], ["Mazda", countryService.getBrandLanguageValues("Mazda").it,getCountryAverage("it")], 
													  ["Acura", countryService.getBrandLanguageValues("Acura").it,getCountryAverage("it")]); break;
							
				case "columnchart_it_4" : brands.push(["Land", "Aufrufe","Average"], ["Ligier", countryService.getBrandLanguageValues("Ligier").it,getCountryAverage("it")], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").it,getCountryAverage("it")], 
													  ["Renault", countryService.getBrandLanguageValues("Renault").it,getCountryAverage("it")], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").it,getCountryAverage("it")], 
													  ["Citroën", countryService.getBrandLanguageValues("Citroën").it,getCountryAverage("it")]); break;
				
				
				case "columnchart_ja_1" : brands.push(["Land", "Aufrufe","Average"], ["Audi", countryService.getBrandLanguageValues("Audi").ja,getCountryAverage("ja")], ["Opel", countryService.getBrandLanguageValues("Opel").ja,getCountryAverage("ja")], 
													  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").ja,getCountryAverage("ja")], ["VW", countryService.getBrandLanguageValues("VW").ja,getCountryAverage("ja")], 
													  ["Smart", countryService.getBrandLanguageValues("Smart").ja,getCountryAverage("ja")], ["Porsche", countryService.getBrandLanguageValues("Porsche").ja,getCountryAverage("ja")], 
													  ["BMW", countryService.getBrandLanguageValues("BMW").ja,getCountryAverage("ja")]); break;
													  
				case "columnchart_ja_2" : brands.push(["Land", "Aufrufe","Average"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").ja,getCountryAverage("ja")], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").ja,getCountryAverage("ja")], 
													  ["Fiat", countryService.getBrandLanguageValues("Fiat").ja,getCountryAverage("ja")], ["Lancia", countryService.getBrandLanguageValues("Lancia").ja,getCountryAverage("ja")], 
													  ["Maserati", countryService.getBrandLanguageValues("Maserati").ja,getCountryAverage("ja")], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").ja,getCountryAverage("ja")], 
													  ["Pagani", countryService.getBrandLanguageValues("Pagani").ja,getCountryAverage("ja")]); break;
				
				case "columnchart_ja_3" : brands.push(["Land", "Aufrufe","Average"], ["Honda", countryService.getBrandLanguageValues("Honda").ja,getCountryAverage("ja")], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").ja,getCountryAverage("ja")], 
													  ["Nissan", countryService.getBrandLanguageValues("Nissan").ja,getCountryAverage("ja")], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").ja,getCountryAverage("ja")], 
													  ["Toyota", countryService.getBrandLanguageValues("Toyota").ja,getCountryAverage("ja")], ["Acura", countryService.getBrandLanguageValues("Acura").ja,getCountryAverage("ja")], 
													  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").ja,getCountryAverage("ja")], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").ja,getCountryAverage("ja")], 
													  ["Isuzu", countryService.getBrandLanguageValues("Isuzu").ja,getCountryAverage("ja")], ["Mazda", countryService.getBrandLanguageValues("Mazda").ja,getCountryAverage("ja")], 
													  ["Acura", countryService.getBrandLanguageValues("Acura").ja,getCountryAverage("ja")]); break;
								
				case "columnchart_ja_4" : brands.push(["Land", "Aufrufe","Average"], ["Ligier", countryService.getBrandLanguageValues("Ligier").ja,getCountryAverage("ja")], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").ja,getCountryAverage("ja")], 
													  ["Renault", countryService.getBrandLanguageValues("Renault").ja,getCountryAverage("ja")], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").ja,getCountryAverage("ja")], 
													  ["Citroën", countryService.getBrandLanguageValues("Citroën").ja,getCountryAverage("ja")]); break;
				
				
				case "columnchart_fr_1" : brands.push(["Land", "Aufrufe","Average"], ["Audi", countryService.getBrandLanguageValues("Audi").fr,getCountryAverage("fr")], ["Opel", countryService.getBrandLanguageValues("Opel").fr,getCountryAverage("fr")], 
													  ["Mercedes-Benz", countryService.getBrandLanguageValues("Mercedes-Benz").fr,getCountryAverage("fr")], ["VW", countryService.getBrandLanguageValues("VW").fr,getCountryAverage("fr")], 
													  ["Smart", countryService.getBrandLanguageValues("Smart").fr,getCountryAverage("fr")], ["Porsche", countryService.getBrandLanguageValues("Porsche").fr,getCountryAverage("fr")], 
													  ["BMW", countryService.getBrandLanguageValues("BMW").fr,getCountryAverage("fr")]); break;
													  
				case "columnchart_fr_2" : brands.push(["Land", "Aufrufe","Average"], ["Lamborghini", countryService.getBrandLanguageValues("Lamborghini").fr,getCountryAverage("fr")], ["Ferrari", countryService.getBrandLanguageValues("Ferrari").fr,getCountryAverage("fr")], 
													  ["Fiat", countryService.getBrandLanguageValues("Fiat").fr,getCountryAverage("fr")], ["Lancia", countryService.getBrandLanguageValues("Lancia").fr,getCountryAverage("fr")], 
													  ["Maserati", countryService.getBrandLanguageValues("Maserati").fr,getCountryAverage("fr")], ["Alfa Romeo", countryService.getBrandLanguageValues("Alfa Romeo").fr,getCountryAverage("fr")], 
													  ["Pagani", countryService.getBrandLanguageValues("Pagani").fr,getCountryAverage("fr")]); break;
										  
				case "columnchart_fr_3" : brands.push(["Land", "Aufrufe","Average"], ["Honda", countryService.getBrandLanguageValues("Honda").fr,getCountryAverage("fr")], ["Mitsubishi", countryService.getBrandLanguageValues("Mitsubishi").fr,getCountryAverage("fr")], 
													  ["Nissan", countryService.getBrandLanguageValues("Nissan").fr,getCountryAverage("fr")], ["Suzuki", countryService.getBrandLanguageValues("Suzuki").fr,getCountryAverage("fr")], 
													  ["Toyota", countryService.getBrandLanguageValues("Toyota").fr,getCountryAverage("fr")], ["Acura", countryService.getBrandLanguageValues("Acura").fr,getCountryAverage("fr")], 
													  ["Daihatsu", countryService.getBrandLanguageValues("Daihatsu").fr,getCountryAverage("fr")], ["Isuzu",countryService.getBrandLanguageValues("Isuzu").fr,getCountryAverage("fr")], 
													  ["Lexus", countryService.getBrandLanguageValues("Lexus").fr,getCountryAverage("fr")], ["Mazda", countryService.getBrandLanguageValues("Mazda").fr,getCountryAverage("fr")], 
													  ["Acura", countryService.getBrandLanguageValues("Acura").fr,getCountryAverage("fr")]); break;
				
				case "columnchart_fr_4" : brands.push(["Land", "Aufrufe","Average"], ["Ligier", countryService.getBrandLanguageValues("Ligier").fr,getCountryAverage("fr")], ["Peugeot", countryService.getBrandLanguageValues("Peugeot").fr,getCountryAverage("fr")], 
													  ["Renault", countryService.getBrandLanguageValues("Renault").fr,getCountryAverage("fr")], ["Bugatti", countryService.getBrandLanguageValues("Bugatti").fr,getCountryAverage("fr")], 
													  ["Citroën", countryService.getBrandLanguageValues("Citroën").fr,getCountryAverage("fr")]); break;
				
				}
					
				var data = google.visualization.arrayToDataTable(brands);
				
				columnchart.draw(data, columnchartOptions);
				google.visualization.events.addListener(columnchart, "onmouseover" , mouseoverHandler);
				
				function mouseoverHandler(event){
					var hoverdColumn = data.getValue(event.row,0)
					var hoverdValue = countryService.getBrandLanguageValues(hoverdColumn)[language]
					
					$rootScope.$broadcast("column:hovered" , {brandName:hoverdColumn, brandValue:hoverdValue, languageVersion:language});
				}
			}
		
		}	
	
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("ChartController", [ '$rootScope', '$scope', 'countryService', 'restService',
			ChartController ]);

})(window.angular);