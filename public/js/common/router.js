var crimpdApp = angular.module('crimpdApp', ['myServices', 'myDirectives', 'myFilters', 'ui.sortable', 'ngAnimate', 'ngRoute', 'ngTouch','loadingBar']);
var myDirectives = angular.module('myDirectives', []);
var myServices = angular.module('myServices', []);
var myFilters = angular.module('myFilters', []);

// ROUTER

crimpdApp.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
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
	when('/exercises', {
		templateUrl: 'partials/exercise-search.html',
		controller: ExerciseSearchCtrl
	}).
	when('/exercises/create', {
		templateUrl: 'partials/exercise-create.html',
		controller: ExerciseCreateCtrl
	}).
	when('/exercises/edit/:exerciseId', {
		templateUrl: 'partials/exercise-create.html',
		controller: ExerciseEditCtrl,
		resolve: ExerciseEditCtrl.resolve
	}).
	when('/exercises/:exerciseId', {
		templateUrl: 'partials/exercise-details.html',
		controller: ExerciseDetailsCtrl,
		resolve: ExerciseDetailsCtrl.resolve
	}).
	when('/privacy-policy', {
		templateUrl: 'partials/privacy-policy.html',
	}).
	when('/dashboard', {
		templateUrl: 'partials/exercise-search.html',
		controller: ExerciseSearchCtrl
	}).
	otherwise({redirectTo: '/'});
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
	$rootScope.$on('LOAD', function () {
		$rootScope.$broadcast('LOADING');
	});
	$rootScope.$on('UNLOAD', function () {
		$rootScope.$broadcast('UNLOADING');
	});
	$rootScope.$on("$routeChangeStart", function (e, next, current) {
		$rootScope.currentUser = userInfo.getUser();
		if ($rootScope.currentUser.role == 0) {
			// $location.path('/login');
		}
	});
});




