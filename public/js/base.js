var crimpdApp = angular.module('crimpdApp', ['myServices', 'myDirectives', 'myFilters']);
var myFilters = angular.module('myFilters', []);

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
function MainCtrl($scope, $route, $routeParams, $location) {
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
};
function HomeCtrl($scope, userInfo, $location) {
 	$scope.name = "HomeCntl";
};
function LoginCtrl($scope, $http, userInfo) {
    $scope.signIn = function() {
        if (!$scope.loginForm.$invalid) {
        $http.post('http://test.crimpd.com/crimpd/auth/' + $scope.login.email, {'password': $scope.login.password})
            .success(function(data) {
                $scope.signInResponseData = data;
            }).then(function() {
                $scope.returnLoginMessage();
            });
        } else {
            return false;
        }
    };
    $scope.returnLoginMessage = function() {
        if ($scope.signInResponseData.success) {
            userInfo.updateUser($scope.signInResponseData.user.username);
        } else {
            $scope.loginMessageError = $scope.signInResponseData.errors.message;
        }
    };
    $scope.loginFormClick = function (e) {
        $scope.errorPresent = false;
        var thisForm = $(e.target).parent('form');
        $(thisForm).removeClass('error');
        if ($scope.loginForm.$error.required) {
            $scope.errorPresent = true;
            $(thisForm).addClass('error');
        }
    };
};
function RegisterCtrl($scope, $routeParams) {
  	$scope.name = "RegisterCtrl";
  	$scope.params = $routeParams;
};














