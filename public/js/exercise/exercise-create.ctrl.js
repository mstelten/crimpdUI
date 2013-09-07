function ExerciseCreateCtrl($scope, exerciseData, $routeParams, $timeout, $location) {
	$scope.panes = {
		basicInfo: true
	};
	var currentMetaArray = [];

	// gets full list of metaData
	exerciseData.queryAllMeta().then(function (data) {
		$scope.allMeta = data.exerciseMeta;
	});

	// gets current exercise data (unless user is creating a new exercise)
	if ($routeParams.exerciseId) {
		exerciseData.querySingleExercise($routeParams.exerciseId).then(function (data) {
			$scope.exerciseModel = data;
			$scope.isNewExr = exerciseData.getIsNewExr();
			$timeout(function () {
				$scope.isNewExr = false;
				exerciseData.setIsNewExrFalse();
			}, 2500);
			$scope.list = {};
			var combinedArray = $scope.exerciseModel.target.concat($scope.exerciseModel.type, $scope.exerciseModel.difficulty, $scope.exerciseModel.equipment);
			angular.forEach(combinedArray, function (value) {
				$scope.list[value.id] = true;
				currentMetaArray.push(value.id);
			});
		});
	} else {
		$scope.list = {};
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
					addMetaArray.push(parseInt(key));
				}
			});
			exerciseData.addMeta($scope.createBasicResp.exercise.id, addMetaArray).then(function (data) {
				$scope.addMetaResp = data;
				$scope.exerciseModel.errorMessages = null;
				if (!$scope.addMetaResp.success) {
					$scope.exerciseModel.errorMessages = $scope.addMetaResp.errors;
				}
			});
			exerciseData.setIsNewExrTrue();
			$location.path('/exercises/edit/' + $scope.createBasicResp.exercise.id);
		};
	};

	// updates basic exercise, adds new metadata, removes now un-checked metadata
	$scope.editExercise = function () {
		exerciseData.updateBasic($scope.exerciseModel.name, $scope.exerciseModel.description, $scope.exerciseModel.id).then(function (data) {
			$scope.editBasicResp = data;
			$scope.exerciseModel.errorMessages = null;
			if ($scope.editBasicResp.success) {
				$scope.exerciseModel = angular.copy($scope.editBasicResp.exercise);
				$scope.exerciseModel.message = "Nice, you updated " + $scope.editBasicResp.exercise.name;
				$scope.exerciseFormUtils.success = true;
				$timeout(function () {
					$scope.exerciseFormUtils.success = false;
				}, 3000);
				updateMetaData();
			} else {
				$scope.exerciseModel.errorMessages = $scope.editBasicResp.errors;
			}
			$scope.exerciseFormUtils.clicked = true;
		});
		var updateMetaData = function () {
			var newMetaArray = [];
			angular.forEach($scope.list, function (value, key) {
				if (value === true) {
					newMetaArray.push(parseInt(key));
				}
			});
			var addMetaArray = _.difference(newMetaArray, currentMetaArray);
			var removeMetaArray = _.difference(currentMetaArray, newMetaArray);
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
			currentMetaArray = newMetaArray;
		};
	};
}