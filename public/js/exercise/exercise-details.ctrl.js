function ExerciseDetailsCtrl($scope, $routeParams, exerciseData, userInfo) {
	exerciseData.querySingleExercise($routeParams.exerciseId).then(function (data) {
		$scope.exr = data;
		for (var i = 0; i < $scope.exr.images.length; i++) {
			if ($scope.exr.images[i].preview === true) {
				$scope.mainImage = $scope.exr.images[i];
			}
		}
	});
	$scope.isContributer = function () {
		return userInfo.isUserContributer();
	};
}