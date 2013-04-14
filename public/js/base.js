var crimpdApp = angular.module('crimpdApp', ['myServices', 'myDirectives', 'myFilters']);
var myFilters = angular.module('myFilters', []);

// ROUTER & CONFIGURE

crimpdApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
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
	otherwise({redirectTo: '/'});
    // when url= '/login/blah' it doesn't redirect to '/'
});

crimpdApp.run(function($rootScope, $location, $route, $http, userInfo) {
	var loginCheckResData = {};
	var usrRole;
	$http.get('http://test.crimpd.com/crimpd/user')
		.success(function (data) {
			if (data.success) {
				switch (data.user.role) {
					case "ROLE_USER":
						usrRole = 1;
						break;
					case "ROLE_CONTRIBUTER":
						usrRole = 2;
						break;
					case "ROLE_ADMIN":
						usrRole = 3;
						break;
				};
				userInfo.updateUser(data.user.username, usrRole);
			}
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
    $scope.userMessage = 'user';
    $scope.refreshUser = function() {
        $scope.currentUser = userInfo.getUser();
        if ($scope.currentUser.name !== 'guest') {
        	$scope.userMessage = 'welcome back, ';
        	$timeout(function() {
        		$scope.userMessage = 'user';
        	}, 2000);
        }
    };
    $scope.refreshUser();
    $scope.$on('userChange', function(e) {
        $scope.refreshUser();
    });
    $scope.isSignedIn = function() {
       return userInfo.isUserSignedIn();
    };
    $scope.signOut = function($event) {
    	$event.preventDefault();
        $http.get('http://test.crimpd.com/crimpd/auth/logout').
            success(function(data) {
            	userInfo.updateUser('guest', 0);
            });    
    };
};

function LoginCtrl($scope, $http, $location, userInfo) {
    $scope.signIn = function() {
        $http.post('http://test.crimpd.com/crimpd/auth/' + $scope.loginModel.email, {'password': $scope.loginModel.password}).
            success(function(data) {
                $scope.signInResData = data;
            }).
			then(function() {
                $scope.returnMessage();
            });
    };
    $scope.returnMessage = function() {
        if ($scope.signInResData.success) {
            userInfo.updateUser($scope.signInResData.user.username);
			$location.path('/');
        } else {
            $scope.loginModel.message = $scope.signInResData.errors.message;
        }
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
        $http.post('http://test.crimpd.com/crimpd/registration/', {'user': userRegInfo}).
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
    };
};

// Need to put "The supplied passwords do not match" in an array by itself.
// Can there be more than one error message returned at the same time?












