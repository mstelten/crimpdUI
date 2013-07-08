function ViewCtrl($scope, $route, $routeParams, $location, $rootScope) {
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
}
ViewCtrl.$inject = ['$scope', '$route', '$routeParams', '$location'];