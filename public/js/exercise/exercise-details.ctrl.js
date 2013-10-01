function ExerciseDetailsCtrl($scope, $routeParams, exerciseData, userInfo) {
	$scope.panes = {
		basicInfo: true
	};
	$scope.isContributer = function () {
		return userInfo.isUserContributer();
	};
	exerciseData.querySingleExercise($routeParams.exerciseId).then(function (data) {
		$scope.exr = data;
		for (var i = 0; i < $scope.exr.images.length; i++) {
			if ($scope.exr.images[i].preview === true) {
				$scope.mainImage = $scope.exr.images[i];
			}
		}
		$scope.stepIndex = 0;
	});
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