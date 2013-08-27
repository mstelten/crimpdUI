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
		$scope.registerFormClicked = true;
	};
}