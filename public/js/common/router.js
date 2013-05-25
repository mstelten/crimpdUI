var crimpdApp = angular.module('crimpdApp', ['myServices', 'myDirectives', 'myFilters']);
var myDirectives = angular.module('myDirectives', []);
var myServices = angular.module('myServices', []);
var myFilters = angular.module('myFilters', []);

// ROUTER

crimpdApp.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
	$httpProvider.defaults.withCredentials = true;
	$routeProvider.when('/', {
		templateUrl: 'partials/community.html',
		controller: CommunityCtrl
	}).
	when('/community', {
		templateUrl: 'partials/community.html',
		controller: CommunityCtrl
	}).
	when('/login', {
		templateUrl: 'partials/login.html',
		controller: LoginCtrl
	}).
	when('/register', {
		templateUrl: 'partials/register.html',
		controller: RegisterCtrl
	}).
	when('/oauth', {
		templateUrl: 'partials/link-oauth.html',
		controller: LinkOAuthCtrl
	}).
	when('/settings', {
		templateUrl: 'partials/user-settings.html',
		controller: UserSettingsCtrl
	}).
	otherwise({redirectTo: '/'});
    // when url= '/login/blah' it doesn't redirect to '/'
});


// RUN AT APP STARTUP

crimpdApp.run(function ($rootScope, $location, $route, $http, userInfo) {
	$http.get(config.apiUrl + '/user')
		.success(function (data) {
			if (data.success) {
				var usrRole = userInfo.determineRole(data.user.role);
				userInfo.updateUser(data.user.username, usrRole);
			}
		});
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		$rootScope.currentUser = userInfo.getUser();
		if ($rootScope.currentUser.role == 0) {
			// $location.path('/login');
		}
	});
});




