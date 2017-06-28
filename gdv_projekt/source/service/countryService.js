function CountryService($rootScope, $http, JSONService, restService) {
	var _selectedCountries = ["de","it","ja","fr"];
	var _countries = {"de" : {} , "it" : {}, "ja" : {}, "fr" : {}};
	
	angular.forEach(_countries, function(country, languageVersion){
		_getCountryJSON(languageVersion).then(function(data){
			_countries[languageVersion] = data;
			
			angular.forEach(_countries[languageVersion]["cars"], function(car, languageVersion){
				angular.forEach(car, function(articles,k){
					angular.forEach(articles, function(article, articleName){
						article.months = [];
						
						//if(article.languageVersion && article.searchquery)
						restService.getClicks(article.languageVersion, article.searchquery).then(function(data){
							angular.forEach(data.items, function(month,k){
								var timestamp = month.timestamp.substr(0,4) + "-" + month.timestamp.substr(4,2) + "-" + month.timestamp.substr(6,2);
								article.months.push({"month" : new Date(timestamp).getMonth(), "views" : month.views});
							});
						});
					});
				});
			});
		});
		
		setTimeout(function(){$rootScope.$broadcast("countries:loaded");},3000);
	});
	
	function _getCountryJSON(languageVersion){
		return JSONService.getJSON(languageVersion);
	}
	
	this.getSelectedCountries = function getSelectedCountries() {
		return _selectedCountries;
	};
	
//	this.setSelectedCountry = function setSelectedCountry(country){
//		$.inArray(country, _selectedCountries) > -1 ?_selectedCountries.splice(_selectedCountries.indexOf(country),1) 
//				: _selectedCountries.length < 2 ? _selectedCountries.push(country) : (_selectedCountries.splice(0,1), _selectedCountries.push(country));		
//		$rootScope.$broadcast("selectedCountries:updated");
//	}
	
	this.getCountry = function(languageVersion){
		return _countries[languageVersion];
	}
	
	this.getBrand = function(brand){
		var value;
		
		angular.forEach(_countries, function(country, languageVersion){
			angular.forEach(country["cars"], function(articles, brandName){
				if(articles[brand]){
					value = articles[brand];
				}
			});
		});
		
		return value;
	}
	
	this.getBrandLanguageValues = function(car) {
		var brandValues = {"de" : {} , "it" : {}, "ja" : {}, "fr" : {}};;
		var result = 0;
		var brandObj = this.getBrand(car);
			
		angular.forEach(brandObj, function(index, name){
			angular.forEach(index, function(car, name){
				angular.forEach(index.months, function(month, name){
				
					result += month.views;
					
				});
				
				switch(index.languageVersion) {
					case "de"	: 	brandValues["de"] = result; break;
					case "it"	:	brandValues["it"] = result; break;
					case "ja"	:	brandValues["ja"] = result; break;
					case "fr"	:	brandValues["fr"] = result; break;
				}
		
				result = 0;
			});
		});

		return brandValues;
	}
	
	this.getBrandValue = function(brand, language) {
		var value =  this.getBrandLanguageValues(brand);

		return value.language;
	}
	
	this.getCars = function() {
		
		var brandValues = {"de" : [] , "it" : [], "ja" : [], "fr" : []};
		
		angular.forEach(_countries, function(country, name){
			angular.forEach(country["cars"], function(articles, brandName){
				
				angular.forEach(articles, function(carValue, carName) {
					
					switch(country["name"]) {
						case "Deutschland" : brandValues["de"].push(carName); break;
						case "Italien" :brandValues["it"].push(carName);  break;
						case "Japan" : brandValues["ja"].push(carName); break;
						case "Frankreich" : brandValues["fr"].push(carName); break;
					}
				})
			});
		});
		
		return brandValues;
	}
}

var app = angular.module("gdvProjekt");
app.service("countryService",  ["$rootScope", "$http", "JSONService", "restService", CountryService]);