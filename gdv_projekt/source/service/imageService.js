function ImageService($rootScope, JSONService) {
	
	var _images = {"de" : {} , "it" : {}, "ja" : {}, "fr" : {}};
	var _images_All = [];
	
	
	
	angular.forEach(_images, function(images, languageVersion){
		_getImageJSON(languageVersion).then(function(data){
			_images[languageVersion] = data;
				
			angular.forEach(_images[languageVersion]["images"], function(value, key) {
				_images_All.push(value);
			});		
		});	
	});
	
	function _getImageJSON(languageVersion){
		switch(languageVersion) {
			case "de" : return JSONService.getJSON("images_de"); break;
			case "it" : return JSONService.getJSON("images_it"); break;
			case "ja" : return JSONService.getJSON("images_ja"); break;
			case "fr" : return JSONService.getJSON("images_fr"); break;	
		}
	}
	
	this.getImages = function getImages() {
		return _images;
	}
	
	this.getAllImages = function () {
		return _images_All;
	}
}

var app = angular.module("gdvProjekt");
app.service("imageService",  ["$rootScope", "JSONService", ImageService]);