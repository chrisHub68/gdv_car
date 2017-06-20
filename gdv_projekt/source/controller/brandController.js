(function(angular) {
	"use strict";

	function BrandController($rootScope, $scope) {
		
		$scope.brands_de = [	 
			 {
				 "brand" : "BMW",
				 "URL"	:  "assets/img/brands/BMW.jpg"
			 },
			 
			 {
				 "brand" : "Opel",
				 "URL"	:  "assets/img/brands/Opel.jpg"
			 },
			 
			 {
				 "brand" : "Mercedes-Benz",
				 "URL"	:  "assets/img/brands/Mercedes-Benz.jpg"
			 },
			 
			 {
				 "brand" : "Volkswagen",
				 "URL"	:  "assets/img/brands/VW.jpg"
			 },
			 
			 {
				 "brand" : "Audi",
				 "URL"	:  "assets/img/brands/Audi.jpg"
			 },
			 {
				 "brand" : "Smart",
				 "URL"	:  "assets/img/brands/Smart.jpg"
			 },
			 
			 {
				 "brand" : "Porsche",
				 "URL"	:  "assets/img/brands/Porsche.jpg"
			 },
		]
		
		$scope.brands_it  = [	 
			 {
				 "brand" : "Ferrari",
				 "URL"	:  "assets/img/brands/Ferrari.jpg"
			 },
			 
			 {
				 "brand" : "Fiat",
				 "URL"	:  "assets/img/brands/Fiat.jpg"
			 },
			 
			 {
				 "brand" : "Lamborghini",
				 "URL"	:  "assets/img/brands/Lamborghini.jpg"
			 },
			 
			 {
				 "brand" : "Lancia",
				 "URL"	:  "assets/img/brands/Lancia.jpg"
			 },
			 
			 {
				 "brand" : "Maserati",
				 "URL"	:  "assets/img/brands/Maserati.jpg"
			 },
			 
			 {
				 "brand" : "Alfa Romeo",
				 "URL"	:  "assets/img/brands/Alfa Romeo.jpg"
			 },
			 
			 {
				 "brand" : "Pagani",
				 "URL"	:  "assets/img/brands/Pagani.jpg"
			 }
		]
		
		$scope.brands_ja  = [	 
			 {
				 "brand" : "Honda",
				 "URL"	:  "assets/img/brands/Honda.jpg"
			 },
			 
			 {
				 "brand" : "Mitsubishi",
				 "URL"	:  "assets/img/brands/Mitsubishi.jpg"
			 },
			 
			 {
				 "brand" : "Nissan",
				 "URL"	:  "assets/img/brands/Nissan.jpg"
			 },
			 
			 {
				 "brand" : "Suzuki",
				 "URL"	:  "assets/img/brands/Suzuki.jpg"
			 },
			 
			 {
				 "brand" : "Toyota",
				 "URL"	:  "assets/img/brands/Toyota.jpg"
			 },
			 
			 {
				 "brand" : "Acura",
				 "URL"	:  "assets/img/brands/Acura.jpg"
			 },
			 
			 {
				 "brand" : "Daihatsu",
				 "URL"	:  "assets/img/brands/Daihatsu.jpg"
			 },
			 
			 {
				 "brand" : "Isuzu",
				 "URL"	:  "assets/img/brands/Isuzu.jpg"
			 },
			 
			 {
				 "brand" : "Lexus",
				 "URL"	:  "assets/img/brands/Lexus.jpg"
			 },
			 
			 {
				 "brand" : "Mazda",
				 "URL"	:  "assets/img/brands/Mazda.jpg"
			 },
			 
			 {
				 "brand" : "Subaru",
				 "URL"	:  "assets/img/brands/Subaru.jpg"
			 }
		]
		
		$scope.brands_fr  = [	 
			 {
				 "brand" : "Citroën",
				 "URL"	:  "assets/img/brands/Citroen.jpg"
			 },
			 
			 {
				 "brand" : "Ligier",
				 "URL"	:  "assets/img/brands/Ligier.jpg"
			 },
			 
			 {
				 "brand" : "Peugeot",
				 "URL"	:  "assets/img/brands/Peugot.jpg"
			 },
			 
			 {
				 "brand" : "Renault",
				 "URL"	:  "assets/img/brands/Renault.jpg"
			 },
			 
			 {
				 "brand" : "Bugatti",
				 "URL"	:  "assets/img/brands/Bugatti.jpg"
			 },
			 
		]
		
		
	}
	
	var app = angular.module("gdvProjekt");
	app.controller("BrandController", [ '$rootScope', '$scope', BrandController ]);

})(window.angular);