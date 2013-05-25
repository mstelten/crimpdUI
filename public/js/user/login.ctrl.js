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