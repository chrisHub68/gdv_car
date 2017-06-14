function JSONService($http) {
	this.getJSON = function getJSON(fileName) {
		return $http.get("assets/data/" + fileName + ".json").then(
				function(response) {
					return response.data;
				}, function(error) {
					return {}
				});
	};
}

var app = angular.module("gdvProjekt");
app.service("JSONService", JSONService);