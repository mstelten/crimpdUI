function ExerciseDetailsCtrl($scope, $routeParams, exerciseData) {
	$scope.params = $routeParams;
	exerciseData.querySingleExercise($routeParams.exerciseId).then(function (data) {
		$scope.exr = data;
	});
	$scope.imgBaseUrl = "http://aa59356d6677171dbd8d-142fcf5163b4da6936f69137fa2786a7.r87.cf2.rackcdn.com";
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