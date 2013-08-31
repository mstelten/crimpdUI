function LoginCtrl($scope, $location, userInfo) {
	$scope.signIn = function () {
		userInfo.signInUser($scope.loginModel.email, $scope.loginModel.password).then(function (data) {
			$scope.signInResData = data;
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
		$scope.loginFormUtils.clicked = true;
	};
}