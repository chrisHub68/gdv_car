function CountryService($rootScope, $http, JSONService, restService) {
	var _selectedCountries = [];
	var _countries = {"de" : {}};
	
	angular.forEach(_countries, function(country, languageVersion){
		_getCountryJSON(languageVersion).then(function(data){
			_countries[languageVersion] = data;
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
	
	$rootScope.$on("countries:load", function(){
		angular.forEach(_countries, function(country, languageVersion){
			angular.forEach(country["cars"], function(article,k){
				angular.forEach(article, function(views, articleName){
					angular.forEach(views, function(view, k){
						restService.getClicks(view.languageVersion, view.searchquery).then(function(data){
							angular.forEach(data.items, function(month,k){
								view.views = month.views;
							});
						});
					});
				});
			});
		});
	});
}

var app = angular.module("gdvProjekt");
app.service("countryService",  ["$rootScope", "$http", "JSONService", "restService", CountryService]);