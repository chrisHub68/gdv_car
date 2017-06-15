function CountryService($rootScope, $http, JSONService, restService) {
	var _selectedCountries = [];
	var _countries = {"de" : {} , "it" : {}, "ja" : {}, "fr" : {}};
	
	angular.forEach(_countries, function(country, languageVersion){
		_getCountryJSON(languageVersion).then(function(data){
			_countries[languageVersion] = data;
			
			angular.forEach(_countries[languageVersion]["cars"], function(car, languageVersion){
				angular.forEach(car, function(articles,k){
					angular.forEach(articles, function(article, articleName){
						article.months = [];
						
						if(article.languageVersion && article.searchquery)
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
	});
	
	function _getCountryJSON(languageVersion){
		return JSONService.getJSON(languageVersion);
	}
	
	this.getSelectedCountries = function getSelectedCountries() {
		return _selectedCountries;
	};
	
	this.setSelectedCountry = function setSelectedCountry(country){
		$.inArray(country, _selectedCountries) > -1 ?_selectedCountries.splice(_selectedCountries.indexOf(country),1) 
				: _selectedCountries.length < 2 ? _selectedCountries.push(country) : (_selectedCountries.splice(0,1), _selectedCountries.push(country));		
		$rootScope.$broadcast("selectedCountries:updated");
	}
	
	this.getCountry = function(languageVersion){
		return _countries[languageVersion];
	}
}

var app = angular.module("gdvProjekt");
app.service("countryService",  ["$rootScope", "$http", "JSONService", "restService", CountryService]);