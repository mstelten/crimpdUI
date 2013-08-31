function ExerciseCreateCtrl($scope, exerciseData, $routeParams, $timeout) {
	$scope.panes = {
		basicInfo: true
	};

	// gets full list of metaData
	exerciseData.queryAllMeta().then(function (data) {
		$scope.allMeta = data.exerciseMeta;
		$scope.list = {};
	});

	// gets current exercise data (unless user is creating a new exercise)
	if ($routeParams.exerciseId) {
		exerciseData.querySingleExercise($routeParams.exerciseId).then(function (data) {
			$scope.exerciseModel = data;
		});
	}

	// fires on Basic Info form submit
	$scope.addOrEditExercise = function () {
		if ($scope.exerciseModel != undefined) {
			if ($scope.exerciseModel.id) {
				$scope.editExercise();
			} else {
				$scope.createNewExercise();
			}
		} else {
			$scope.createNewExercise();
		}
	};

	// creates basic exercise, assigns excerise data to exerciseModel (formModel), adds metadata
	$scope.createNewExercise = function () {
		exerciseData.createBasic($scope.exerciseModel.name, $scope.exerciseModel.description).then(function (data) {
			$scope.createBasicResp = data;
			$scope.exerciseModel.errorMessages = null;
			if ($scope.createBasicResp.success) {
				$scope.exerciseModel = angular.copy($scope.createBasicResp.exercise);
				$scope.exerciseModel.message = "You have created the exercise: " + $scope.createBasicResp.exercise.name;
				$scope.exerciseFormUtils.success = true;
				$timeout(function () {
					$scope.exerciseFormUtils.success = false;
				}, 3000);
				addMetaData();
			} else {
				$scope.exerciseModel.errorMessages = $scope.createBasicResp.errors;
			}
			$scope.exerciseFormUtils.clicked = true;
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
				$scope.exerciseModel.errorMessages = null;
				if (!$scope.addMetaResp.success) {
					$scope.exerciseModel.errorMessages = $scope.addMetaResp.errors;
				}
			});
		};
	};

	// updates basic exercise, adds new metadata, removes now un-checked metadata
	$scope.editExercise = function () {
		exerciseData.updateBasic($scope.exerciseModel.name, $scope.exerciseModel.description, $scope.exerciseModel.id).then(function (data) {
			$scope.editBasicResp = data;
			$scope.exerciseModel.errorMessages = null;
			if ($scope.editBasicResp.success) {
				$scope.exerciseModel = angular.copy($scope.editBasicResp.exercise);
				$scope.exerciseModel.message = "You have created the exercise: " + $scope.editBasicResp.exercise.name;
				updateMetaData();
			} else {
				$scope.exerciseModel.errorMessages = $scope.editBasicResp.errors;
			}
			$scope.exerciseFormUtils.clicked = true;
		});
		var updateMetaData = function () {
			var currentMetaArray = [];
			var newMetaArray = [];
			var addMetaArray = [];
			var removeMetaArray = [];
			angular.forEach($scope.list, function (value, key) {
				if (value === true) {
					newMetaArray.push(key);
				}
			});
			exerciseData.addMeta($scope.editBasicResp.exercise.id, addMetaArray).then(function (data) {
				$scope.addMetaResp = data;
				$scope.exerciseModel.errorMessages = null;
				if (!$scope.addMetaResp.success) {
					$scope.exerciseModel.errorMessages = $scope.addMetaResp.errors;
				}
			});
			exerciseData.removeMeta($scope.editBasicResp.exercise.id, removeMetaArray).then(function (data) {
				$scope.removeMetaResp = data;
				$scope.exerciseModel.errorMessages = null;
				if (!$scope.removeMetaResp.success) {
					$scope.exerciseModel.errorMessages = $scope.removeMetaResp.errors;
				}
			});
		};
	};
}