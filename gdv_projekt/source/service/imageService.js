function ImageService($rootScope, JSONService) {
	
	var _images_country = {"de" : {} , "it" : {}, "ja" : {}, "fr" : {}};
	var _images_All = [];
	
	
	
	angular.forEach(_images_country, function(images, languageVersion){
		_getImageJSON(languageVersion).then(function(data){
			_images_country[languageVersion] = data;
				
			angular.forEach(_images_country[languageVersion]["images"], function(value, key) {
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
	
	this.getImagesInCountry = function getImages() {
		return _images_country;
	}
	
	this.getAllImages = function() {
		return _images_All;
	}
	
	this.getImageURL = function(brandName) {
		var url;
		
		angular.forEach(_images_All, function(image, image_key) {
			if(image["brand"] == brandName){
				url = image["URL"]
			}
		});
		
		return url;
	}
}

var app = angular.module("gdvProjekt");
app.service("imageService",  ["$rootScope", "JSONService", ImageService]);