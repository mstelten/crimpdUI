function LinkOAuthCtrl($scope, $http, $location, userInfo) {
	$scope.linkAccount = function () {
		$http.post(config.apiUrl + '/oauth/save/linkaccount', {'username': $scope.linkAccountModel.email, 'password': $scope.linkAccountModel.password}).
			success(function (data) {
				$scope.linkAccountResData = data;
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
LinkOAuthCtrl.$inject = ['$scope', '$http', '$location', 'userInfo'];