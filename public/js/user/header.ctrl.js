function HeaderCtrl($scope, userInfo, $timeout, $location) {
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
		userInfo.signOutUser().then(function () {
			userInfo.updateUser('noob', 0);
		});
	};
	$scope.isActive = function (path) {
		if ($location.path() == path) {
			return "active"
		} else {
			return ""
		}
	};
}
HeaderCtrl.$inject = ['$scope', 'userInfo', '$timeout', '$location'];