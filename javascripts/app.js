var app = angular.module('microservice', ['ngRoute']);

app.controller('HomeController', function($scope){

})

app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/',
		controller: 'HomeController'
	})
})