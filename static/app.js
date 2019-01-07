angular.module('app', [ "ngRoute" ])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider.when("/", {
			templateUrl: "table.html"
		}).otherwise("/");
		$locationProvider.hashPrefix("");
	});