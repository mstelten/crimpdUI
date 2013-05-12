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

// CONTROLLERS

function MainCtrl($scope, $route, $routeParams, $location) {
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
}

function HomeCtrl($scope) {
	$scope.name = "HomeCntl";
}

function HeaderCtrl($scope, userInfo, $http, $timeout) {
	$scope.state = "hide";
	$scope.refreshUser = function () {
		$scope.currentUser = userInfo.getUser();
	};
	$scope.refreshUser();

	$scope.animateTerms = {show: 'fade-show', hide: 'fade-hide'};
	$scope.startAnimations = function () {
		$scope.isSignedIn = function () {
			return !!($scope.currentUser.role !== 0);
		};
		$timeout(function () {
			$scope.state = undefined;
		}, 200);
	};
	$timeout(function () {
		$scope.startAnimations()
	}, 300);

	$scope.$on('userChange', function (e) {
		$scope.refreshUser();
	});
	$scope.signOut = function ($event) {
		$event.preventDefault();
		$http.get(config.apiUrl + '/auth/logout').
			success(function (data) {
				userInfo.updateUser('noob', 0);
			});
	};
};

function LoginCtrl($scope, $http, $location, userInfo) {
	$scope.signIn = function () {
		$http.post(config.apiUrl + '/auth/' + $scope.loginModel.email, {'password': $scope.loginModel.password}).
			success(function (data) {
				$scope.signInResData = data;
			}).
			then(function () {
				$scope.returnMessage();
			});
	};
	$scope.returnMessage = function () {
		if ($scope.signInResData.success) {
			var usrRole = userInfo.determineRole($scope.signInResData.user.role);
			userInfo.updateUser($scope.signInResData.user.username, usrRole);
			$location.path('/');
		} else {
			$scope.loginModel.errorMessages = $scope.signInResData.errors;
		}
		$scope.loginModel.clicked = true;
	};
}

function LinkOAuthCtrl($scope, $http, $location, userInfo) {
	$scope.linkAccount = function () {
		$http.post(config.apiUrl + '/oauth/save/linkaccount', {'username': $scope.linkAccountModel.email, 'password': $scope.linkAccountModel.password}).
			success(function (data) {
				$scope.updateProfileResData = data;
			}).
			then(function () {
				$scope.returnMessageLinkAccount();
			});
	};
	$scope.returnMessageLinkAccount = function () {
		if ($scope.updateProfileResData.success) {
			var usrRole = userInfo.determineRole($scope.updateProfileResData.user.role);
			userInfo.updateUser($scope.updateProfileResData.user.username, usrRole);
			$location.path('/');
		} else {
			$scope.linkAccountModel.errorMessages = $scope.updateProfileResData.errors;
		}
		$scope.linkAccountModel.clicked = true;
	};
	$scope.createlinkedAccount = function () {
		$http.post(config.apiUrl + '/oauth/save/createaccount', {'username': $scope.newAccountModel.username, 'email': $scope.newAccountModel.email}).
			success(function (data) {
				$scope.changePasswordResData = data;
			}).
			then(function () {
				$scope.returnMessageNewAccount();
			});
	};
	$scope.returnMessageNewAccount = function () {
		if ($scope.changePasswordResData.success) {
			var usrRole = userInfo.determineRole($scope.changePasswordResData.user.role);
			userInfo.updateUser($scope.changePasswordResData.user.username, usrRole);
			$location.path('/');
		} else {
			$scope.newAccountModel.errorMessages = $scope.changePasswordResData.errors;
		}
		$scope.newAccountModel.clicked = true;
	};
}

function RegisterCtrl($scope, $http) {
	var userRegInfo = {};
	$scope.register = function () {
		userRegInfo = {
			'username': $scope.registerModel.username,
			'firstName': $scope.registerModel.firstName,
			'lastName': $scope.registerModel.lastName,
			'email': $scope.registerModel.email,
			'password': $scope.registerModel.password,
			'confirmPassword': $scope.registerModel.confirmPassword
		};
		$http.post(config.apiUrl + '/registration/', {'user': userRegInfo}).
			success(function (data) {
				$scope.registerResData = data;
			}).
			then(function () {
				$scope.returnMessage();
			});
	};
	$scope.returnMessage = function () {
		$scope.registerModel.errorMessages = null;
		if ($scope.registerResData.success) {
			$scope.registerModel.message = "You have registered user " + userRegInfo.username + ". You will recieve an email shortly. Click the link in the email to finish the registration process.";
		} else {
			$scope.registerModel.errorMessages = $scope.registerResData.errors;
		}
		$scope.registerModel.clicked = true;
	};
}

function UserSettingsCtrl($scope, $http, userInfo) {
	$scope.updateProfile = function () {
		$http.put(config.apiUrl + '/user', {'username': $scope.linkAccountModel.email, 'password': $scope.linkAccountModel.password}).
			success(function (data) {
				$scope.updateProfileResData = data;
			}).
			then(function () {
				$scope.returnMessageUpdateProfile();
			});
	};
	$scope.returnMessageUpdateProfile = function () {
		if ($scope.updateProfileResData.success) {
			var usrRole = userInfo.determineRole($scope.updateProfileResData.user.role);
			userInfo.updateUser($scope.updateProfileResData.user.username, usrRole);
		} else {
			$scope.linkAccountModel.errorMessages = $scope.updateProfileResData.errors;
		}
		$scope.linkAccountModel.clicked = true;
	};
	$scope.changePassword = function () {
		$http.post(config.apiUrl + '/oauth/save/createaccount', {'username': $scope.newAccountModel.username, 'email': $scope.newAccountModel.email}).
			success(function (data) {
				$scope.changePasswordResData = data;
			}).
			then(function () {
				$scope.returnMessageChangePassword();
			});
	};
	$scope.returnMessageChangePassword = function () {
		if ($scope.changePasswordResData.success) {
			var usrRole = userInfo.determineRole($scope.changePasswordResData.user.role);
			userInfo.updateUser($scope.changePasswordResData.user.username, usrRole);
			$location.path('/');
		} else {
			$scope.newAccountModel.errorMessages = $scope.changePasswordResData.errors;
		}
		$scope.newAccountModel.clicked = true;
	};
}