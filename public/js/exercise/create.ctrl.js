function ExerciseCreateCtrl($scope, exerciseData) {
	exerciseData.queryAllMeta().then(function (data) {
		$scope.allMeta = data.exerciseMeta;
	});
	$scope.createNewExercise = function () {
		exerciseData.createBasic($scope.newExerciseModel.name, $scope.newExerciseModel.description).then(function (data) {
			$scope.createBasicResp = data;
			$scope.newExerciseModel.errorMessages = null;
			if ($scope.createBasicResp.success) {
				$scope.newExerciseModel.message = "You have created the exercise: " + $scope.createBasicResp.exercise.name;
				addMetaData();
			} else {
				$scope.newExerciseModel.errorMessages = $scope.createBasicResp.errors;
			}
			$scope.newExerciseModel.clicked = true;
		});
		var addMetaData = function () {
			var addMetaArray = $scope.newExerciseModel.targets.concat($scope.newExerciseModel.types, $scope.newExerciseModel.difficulties, $scope.newExerciseModel.equipment);
			exerciseData.addMeta($scope.createBasicResp.exercise.id, addMetaArray).then(function (data) {
				$scope.addMetaResp = data;
				$scope.newExerciseModel.errorMessages = null;
				if (!$scope.addMetaResp.success) {
					$scope.newExerciseModel.errorMessages = $scope.addMetaResp.errors;
				}
			});
		};
	};
}