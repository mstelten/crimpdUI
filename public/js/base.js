var crimpdApp = angular.module('crimpdApp', ['myServices', 'myDirectives', 'myFilters']);
var myFilters = angular.module('myFilters', []);

// ROUTER

crimpdApp.config(function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
	$httpProvider.defaults.withCredentials = true;
	$routeProvider.when('/', {
		templateUrl: 'partials/home.html',
		controller: HomeCtrl
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
	otherwise({redirectTo: '/'});
    // when url= '/login/blah' it doesn't redirect to '/'
});

// RUN AT APP STARTUP

crimpdApp.run(function($rootScope, $location, $route, $http, userInfo) {
	$http.get('http://api.crimpd.com/crimpd/user')
		.success(function (data) {
			if (data.success) {
				var usrRole = userInfo.determineRole(data.user.role);
				userInfo.updateUser(data.user.username, usrRole);
			};
		});
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $rootScope.currentUser = userInfo.getUser();
        if ($rootScope.currentUser.role == 0) {
            // $location.path('/login');
        };
    });
});

// CONTROLLERS

function MainCtrl($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
};

function HomeCtrl($scope, userInfo, $location) {
    $scope.name = "HomeCntl";
};

function HeaderCtrl($scope, userInfo, $http, $timeout) {
    $scope.state = "hide";
    $scope.refreshUser = function() {
        $scope.currentUser = userInfo.getUser();
    };
    $scope.refreshUser();

	$scope.animateTerms = {show: 'fade-show', hide: 'fade-hide'};
	$scope.startAnimations = function() {
		$scope.isSignedIn = function () {
			return !!($scope.currentUser.role !== 0);
		};
		$timeout(function() {
			$scope.state = undefined;
		}, 200);
	};
	$timeout(function() {
		$scope.startAnimations()
	}, 300);

    $scope.$on('userChange', function(e) {
        $scope.refreshUser();
    });
    $scope.signOut = function($event) {
    	$event.preventDefault();
        $http.get('http://api.crimpd.com/crimpd/auth/logout').
            success(function(data) {
            	userInfo.updateUser('noob', 0);
            });    
    };
};

function LoginCtrl($scope, $http, $location, userInfo) {
    $scope.signIn = function() {
        $http.post('http://api.crimpd.com/crimpd/auth/' + $scope.loginModel.email, {'password': $scope.loginModel.password}).
            success(function(data) {
                $scope.signInResData = data;
            }).
			then(function() {
                $scope.returnMessage();
            });
    };
    $scope.returnMessage = function() {
        if ($scope.signInResData.success) {
			var usrRole = userInfo.determineRole($scope.signInResData.user.role);
            userInfo.updateUser($scope.signInResData.user.username, usrRole);
			$location.path('/');
        } else {
            $scope.loginModel.errorMessages = $scope.signInResData.errors;
        }
		$scope.loginModel.clicked = true;
    };
};

function LinkOAuthCtrl($scope, $http, $location, userInfo) {
	$scope.linkAccount = function () {
		$http.post('http://api.crimpd.com/crimpd/oauth/save/linkaccount', {'username': $scope.linkAccountModel.email, 'password': $scope.linkAccountModel.password}).
			success(function (data) {
				$scope.linkAccountResData = data;
			}).
			then(function () {
				$scope.returnMessageLinkAccount();
			});
	};
	$scope.returnMessageLinkAccount = function () {
		if ($scope.linkAccountResData.success) {
			var usrRole = userInfo.determineRole($scope.linkAccountResData.user.role);
			userInfo.updateUser($scope.linkAccountResData.user.username, usrRole);
			$location.path('/');
		} else {
			$scope.linkAccountModel.errorMessages = $scope.linkAccountResData.errors;
		}
		$scope.linkAccountModel.clicked = true;
	};
	$scope.createlinkedAccount = function () {
		$http.post('http://api.crimpd.com/crimpd/oauth/save/createaccount', {'username': $scope.newAccountModel.username, 'email': $scope.newAccountModel.email}).
			success(function (data) {
				$scope.newAccountResData = data;
			}).
			then(function () {
				$scope.returnMessageNewAccount();
			});
	};
	$scope.returnMessageNewAccount = function () {
		if ($scope.newAccountResData.success) {
			var usrRole = userInfo.determineRole($scope.newAccountResData.user.role);
			userInfo.updateUser($scope.newAccountResData.user.username, usrRole);
			$location.path('/');
		} else {
			$scope.newAccountModel.errorMessages = $scope.newAccountResData.errors;
		}
		$scope.newAccountModel.clicked = true;
	};
};

function RegisterCtrl($scope, $http) {
	var userRegInfo = {};
    $scope.register = function() {
        userRegInfo = {
            'username': $scope.registerModel.username,
            'firstName': $scope.registerModel.firstName,
            'lastName': $scope.registerModel.lastName,
            'email': $scope.registerModel.email,
            'password': $scope.registerModel.password,
            'confirmPassword': $scope.registerModel.confirmPassword
        };
        $http.post('http://api.crimpd.com/crimpd/registration/', {'user': userRegInfo}).
            success(function(data) {
                $scope.registerResData = data;
            }).
			then(function() {
				$scope.returnMessage();
			});
    };
    $scope.returnMessage = function() {
		$scope.registerModel.errorMessages = null;
        if ($scope.registerResData.success) {
			$scope.registerModel.message = "You have registered user " + userRegInfo.username + ". You will recieve an email shortly. Click the link in the email to finish the registration process.";
        } else {
			$scope.registerModel.errorMessages = $scope.registerResData.errors;
		};
		$scope.registerModel.clicked = true;
    };
};








