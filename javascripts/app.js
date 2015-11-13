var app = angular.module('microservice', ['ngRoute']);

app.controller('HomeController', function($scope, $http){

	getData = function(){
	$http.get('http://g12-kelly-byrne-memories.cfapps.io/api/v1/memories').then(function(response){
		$scope.memoriesData = response.data.rows;
		})
	};

	getData();
	

	$scope.addMemory = function(){
		$http.post('http://g12-kelly-byrne-memories.cfapps.io/api/v1/memories', 
				{
  	"data": {
    "type": "memory",
    "attributes": {
      "old_days": $scope.old_days,
      "these_days": $scope.these_days,
      "year": $scope.year
    }
  }
}).then(function(){
	$scope.old_days = '';
		$scope.these_days = '';
		$scope.year = '';

		getData();
})
	}
})

app.controller('YearsController', function($scope, $http, $location){
	$scope.year = $location.url().split('/')[2]
	$http.get('http://g12-kelly-byrne-memories.cfapps.io/api/v1/memories/' + $scope.year).then(function(response){
		$scope.yearData = response.data.rows;
		$scope.year = response.data.rows[0].year;
	})

	$http.get('http://g12-kelly-byrne-memories.cfapps.io/api/v1/memories/years').then(function(response){
		$scope.allYears = response.data
	})

})

app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/partials/home.html',
		controller: 'HomeController'
	})
	.when('/years/:year', {
		templateUrl: '/partials/years.html',
		controller: 'YearsController'
	})

	$locationProvider.html5Mode(true);
});
