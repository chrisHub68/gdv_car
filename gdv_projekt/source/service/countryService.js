function CountryService($rootScope, $http) {
	var _selectedCountries = [];
	
	this.getSelectedCountries = function getSelectedCountries() {
		return _selectedCountries;
	};
	
	this.setSelectedCountry = function setSelectedCountry(country){
		$.inArray(country, _selectedCountries) > -1 ?_selectedCountries.splice(_selectedCountries.indexOf(country),1) : _selectedCountries.length < 2 ? _selectedCountries.push(country) : (_selectedCountries.splice(0,1), _selectedCountries.push(country));
				
		$rootScope.$broadcast("selectedCountries:updated");
	}
}

var app = angular.module("gdvProjekt");
app.service("countryService", CountryService);