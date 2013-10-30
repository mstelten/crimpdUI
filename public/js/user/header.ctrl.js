crimpdApp.controller('HeaderCtrl', function ($scope, userInfo, $location) {
	$scope.state = "hide";
	$scope.refreshUser = function () {
		$scope.currentUser = userInfo.getUser();
	};
	$scope.refreshUser();

	$scope.isSignedIn = function () {
		return userInfo.isUserAuth();
	};

	$scope.$on('userChange', function (e) {
		$scope.refreshUser();
	});
	$scope.signOut = function ($event) {
		$event.preventDefault();
		userInfo.signOutUser().then(function () {
			userInfo.updateUser('noob', 0);
		});
	};
	$scope.isActiveExact = function (path) {
		if ($location.path() == path) {
			return "active"
		} else {
			return ""
		}
	};
	$scope.isActive = function (path) {
		if ($location.path().indexOf(path) > -1) {
			return "active"
		} else {
			return ""
		}
	};
});