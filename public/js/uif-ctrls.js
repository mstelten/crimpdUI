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
	$scope.createNewAccount = function () {
		$http.post(config.apiUrl + '/oauth/save/createaccount', {'username': $scope.newAccountModel.username}).
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

function UserSettingsCtrl($scope, $http) {
	var userUpdateInfo = {};
	var changePasswordInfo = {};
	$scope.updateProfile = function () {
		userUpdateInfo = {
			'email': $scope.updateProfileModel.email
		};
		if ($scope.updateProfileModel.firstname) {
			userUpdateInfo.firstName = $scope.updateProfileModel.firstname;
		}
		if ($scope.updateProfileModel.lastname) {
			userUpdateInfo.lastName = $scope.updateProfileModel.lastname;
		}
		$http.put(config.apiUrl + '/user', {'user': userUpdateInfo}).
			success(function (data) {
				$scope.updateProfileResData = data;
			}).
			then(function () {
				$scope.returnMessageUpdateProfile();
			});
	};
	$scope.returnMessageUpdateProfile = function () {
		if ($scope.updateProfileResData.user) {
			$scope.updateProfileModel.errorMessages = [{message: "Your profile has been succcessfully updated."}];
		} else {
			$scope.updateProfileModel.errorMessages = $scope.updateProfileResData.errors;
		}
		$scope.updateProfileModel.clicked = true;
	};
	$scope.changePassword = function () {
		changePasswordInfo = {
			'currentPassword': $scope.changePasswordModel.currentPW,
			'newPassword': $scope.changePasswordModel.newPW,
			'confirmPassword': $scope.changePasswordModel.confirmNewPW
		};
		$http.post(config.apiUrl + '/user/changePassword', changePasswordInfo).
			success(function (data) {
				$scope.changePasswordResData = data;
			}).
			then(function () {
				$scope.returnMessageChangePassword();
			});
	};
	$scope.returnMessageChangePassword = function () {
		if ($scope.changePasswordResData.success) {
			$scope.changePasswordModel.errorMessages = [{message: "Your password has been succcessfully updated."}];
		} else {
			$scope.changePasswordModel.errorMessages = $scope.changePasswordResData.errors;
		}
		$scope.changePasswordModel.clicked = true;
	};
}