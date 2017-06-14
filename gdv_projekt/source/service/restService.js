function RestService($http) {
	this.getClicks = function getClicks(languageVersion, searchQuery) {
		_get("wikimedia.org/api/rest_v1/metrics/pageviews/per-article/" + languageVersion + ".wikipedia/all-access/all-agents/" + searchQuery + "/monthly/2016010100/2016123100");
	};

	function _get(url) {
		return $http.get(url).then(function(response) {
			return response.data;
		}, function(error) {
			return {}
		});
	}
}

var app = angular.module("gdvProjekt");
app.service("restService", RestService);