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
				$scope.returnMessageUpdateProfile();
			});
	};
	$scope.returnMessageUpdateProfile = function () {
		if ($scope.updateProfileResData.user) {
			$scope.updateProfileModel.errorMessages = [
				{message: "Your profile has been succcessfully updated."}
			];
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
				$scope.returnMessageChangePassword();
			});
	};
	$scope.returnMessageChangePassword = function () {
		if ($scope.changePasswordResData.success) {
			$scope.changePasswordModel.errorMessages = [
				{message: "Your password has been succcessfully updated."}
			];
		} else {
			$scope.changePasswordModel.errorMessages = $scope.changePasswordResData.errors;
		}
		$scope.changePasswordModel.clicked = true;
	};
}
UserSettingsCtrl.$inject = ['$scope', '$http'];