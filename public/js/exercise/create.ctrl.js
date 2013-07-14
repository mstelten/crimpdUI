function ExerciseCreateCtrl($scope, exerciseData) {
	exerciseData.queryAllMeta().then(function (data) {
		$scope.allMeta = data;
	});
}