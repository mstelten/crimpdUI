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
        	$scope.userMessage = 'welcome back, '
        	$timeout(function() {
        		$scope.userMessage = 'user'
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

function LoginCtrl($scope, $http, userInfo) {
    $scope.signIn = function() {
        $http.post('http://test.crimpd.com/crimpd/auth/' + $scope.loginModel.email, {'password': $scope.loginModel.password})
            .success(function(data) {
                $scope.signInResponseData = data;
            }).then(function() {
                $scope.returnErrorMessage();
            });
    };
    $scope.returnErrorMessage = function() {
        if ($scope.signInResponseData.success) {
            userInfo.updateUser($scope.signInResponseData.user.username);
        } else {
            $scope.loginModel.error = $scope.signInResponseData.errors.message;
        }
    };
};

function RegisterCtrl($scope) {
    $scope.register = function() {
        var userRegInfo = {
            'username': $scope.registration.userName,
            'firstName': $scope.registration.firstName,
            'lastName': $scope.registration.lastName,
            'email': $scope.registration.email,
            'password': $scope.registration.passworld,
            'confirmPassword': $scope.registration.confirmPassword
        }
        $http.post('http://test.crimpd.com/crimpd/registration/', userRegInfo)
            .success(function(data) {
                $scope.registerResponseData = data;
            }).then(function() {
                $scope.returnErrorMessage();
            });
    };
    $scope.returnErrorMessage = function() {
        if ($scope.registerResponseData.success) {
            userInfo.updateUser($scope.signInResponseData.user.username);
        } else {
            $scope.registrationMessageError = $scope.registerResponseData.errors.message;
        }
    };
};














