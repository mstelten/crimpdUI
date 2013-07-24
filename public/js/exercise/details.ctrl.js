function ExerciseDetailsCtrl($scope, $routeParams, exerciseData) {
	$scope.params = $routeParams;
	exerciseData.querySingleExercise($routeParams.exerciseId).then(function (data) {
		$scope.exr = data;
	});
	$scope.equipment = function () {
		var equips = [];
		for (var i=0; i < $scope.exr.metadata.length; i++ ) {
			if ($scope.exr.metadata[i].type !== undefined && $scope.exr.metadata[i].type == "Equipment") {
				equips.push($scope.exr.metadata[i].name);
			}
		}
		return equips;
	}
}