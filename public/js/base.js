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

crimpdApp.run(function($rootScope, $location, $route, userInfo) {
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
       return !!($scope.currentUser.role == (1 || 2 || 3));
    };
    $scope.signOut = function($event) {
    	$event.preventDefault();
        $http.get('http://test.crimpd.com/crimpd/auth/logout')
            .success(function(data) {
            	userInfo.updateUser('guest', 0);
            });    
    };
};

function LoginCtrl($scope, $http, $location, userInfo) {
    $scope.signIn = function() {
        $http.post('http://test.crimpd.com/crimpd/auth/' + $scope.loginModel.email, {'password': $scope.loginModel.password}).
            success(function(data) {
                $scope.signInResponseData = data;
            }).
			then(function() {
                $scope.returnMessage();
            });
    };
    $scope.returnMessage = function() {
        if ($scope.signInResponseData.success) {
            userInfo.updateUser($scope.signInResponseData.user.username);
			$location.path('/');
        } else {
            $scope.loginModel.message = $scope.signInResponseData.errors.message;
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
                $scope.registerResponseData = data;
            }).
			then(function() {
				$scope.returnMessage();
			});
    };
    $scope.returnMessage = function() {
		$scope.registerModel.errorMessages = null;
        if ($scope.registerResponseData.success) {
			$scope.registerModel.message = "You have registered user " + userRegInfo.username + ". You will recieve an email shortly. Click the link in the email to finish the registration process.";
        } else {
			$scope.registerModel.errorMessages = $scope.registerResponseData.errors;
		};
    };
};

// Need to put "The supplied passwords do not match" in an array by itself.
// Can there be more than one error message returned at the same time?












