function ExerciseDetailsCtrl($scope, $routeParams, exerciseData) {
	$scope.params = $routeParams;
	exerciseData.querySingleExercise($routeParams.exerciseId).then(function (data) {
		$scope.exr = data;
	});
}
ExerciseDetailsCtrl.$inject = ['$scope', '$routeParams', 'exerciseData'];