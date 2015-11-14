var app = angular.module('microservice', ['ngRoute']);

app.controller('HomeController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){

	$http.get('http://galvanize-service-registry.cfapps.io/api/v1/cohorts/g12/kids-these-days?guarantee=http://g12-kelly-byrne-memories.cfapps.io').then(function(response){
  	$rootScope.url = response.data.data[0].attributes.url;
  	return $rootScope.url;
	}).then(function(url){
			var api = url + '/api/v1/memories';
		getData = function(){
			$http.get(api).then(function(response){
				$scope.memoriesData = response.data.data;
			})
		};

			getData();
	
		$scope.addMemory = function(){
			$http.post(api,
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


}])

app.controller('YearsController', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location){
	$scope.year = $location.url().split('/')[2];
	$http.get($rootScope.url + '/api/v1/memories/' + $scope.year).then(function(response){
		$scope.yearData = response.data.data
	})

	$http.get($rootScope.url + '/api/v1/memories/years').then(function(response){
		$scope.allYears = response.data.data;
	})

}])

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
