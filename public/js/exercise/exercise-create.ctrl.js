function ExerciseCreateCtrl($scope, exerciseData) {
	$scope.createTabs = 0;
	$scope.exrId = null;
	$scope.newExerciseModel = {
		name: "chipper"
	};

	exerciseData.queryAllMeta().then(function (data) {
		$scope.allMeta = data.exerciseMeta;
		$scope.list = {};
	});
	$scope.createNewExercise = function () {
		exerciseData.createBasic($scope.newExerciseModel.name, $scope.newExerciseModel.description).then(function (data) {
			$scope.createBasicResp = data;
			$scope.exrId = $scope.createBasicResp.exercise.id;
			$scope.newExerciseModel = {
				name: $scope.createBasicResp.exercise.name,
				description: $scope.createBasicResp.exercise.description
			};
			$scope.newExerciseModel.errorMessages = null;
			if ($scope.createBasicResp.success) {
				$scope.newExerciseModel.message = "You have created the exercise: " + $scope.createBasicResp.exercise.name;
				addMetaData();
			} else {
				$scope.newExerciseModel.errorMessages = $scope.createBasicResp.errors;
			}
			$scope.newExerciseFormClicked = true;
		});
		var addMetaData = function () {
			var addMetaArray = [];
			angular.forEach($scope.list, function (value, key) {
				if (value === true) {
					addMetaArray.push(key);
				}
			});
			exerciseData.addMeta($scope.createBasicResp.exercise.id, addMetaArray).then(function (data) {
				$scope.addMetaResp = data;
				$scope.newExerciseModel.errorMessages = null;
				if (!$scope.addMetaResp.success) {
					$scope.newExerciseModel.errorMessages = $scope.addMetaResp.errors;
				}
			});
		};
	};
	$scope.editBasic = function () {
		exerciseData.updateBasic($scope.newExerciseModel.name, $scope.newExerciseModel.description, exrId).then(function (data) {
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
	};
}