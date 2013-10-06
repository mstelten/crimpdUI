function ExerciseDetailsCtrl($scope, exerciseModel, userInfo) {
	$scope.exr = exerciseModel;
	$scope.isContributer = function () {
		return userInfo.isUserContributer();
	};
	$scope.panes = {
		basicInfo: true
	};
	for (var i = 0; i < $scope.exr.images.length; i++) {
		if ($scope.exr.images[i].preview === true) {
			$scope.mainImage = $scope.exr.images[i];
		}
	}
	$scope.stepIndex = 0;
	$scope.nextStep = function () {
		if ($scope.exr.images[$scope.stepIndex + 1]) {
			$scope.stepIndex++;
		} else {
			$scope.stepIndex = 0;
		}
	};
	$scope.prevStep = function () {
		if ($scope.exr.images[$scope.stepIndex - 1]) {
			$scope.stepIndex--;
		} else {
			$scope.stepIndex = $scope.exr.images.length - 1;
		}
	};
}

ExerciseDetailsCtrl.resolve = {
	exerciseModel: function ($http, $route, $q) {
		var deferred = $q.defer();
		$http.get(config.apiUrl + '/exercise/' + $route.current.params.exerciseId).success(function (data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	}
};