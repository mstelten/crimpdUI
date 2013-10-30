crimpdApp.controller('ExerciseCreateCtrl', function ($scope, exerciseData, $location, $timeout) {
	$scope.panes = {
		basicInfo: true
	};
	$scope.list = {};
	$scope.$on('LOADING', function () {
		$scope.loading = true;
	});
	$scope.$on('UNLOADING', function () {
		$scope.loading = false;
	});

	// gets full list of metaData
	exerciseData.queryAllMeta().then(function (data) {
		$scope.allMeta = data.exerciseMeta;
	});

	// fires on Basic Info form submit
	$scope.addOrEditExercise = function () {
		$scope.createNewExercise();
	};

	// creates basic exercise, assigns excerise data to exerciseModel (formModel), adds metadata
	$scope.createNewExercise = function () {
		$scope.$emit('LOAD');
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
			$scope.$emit('UNLOAD');
			exerciseData.setIsNewExrTrue();
			$timeout(function () {
				$location.path('/exercises/edit/' + $scope.createBasicResp.exercise.id);
			}, 500);
		};
	};
});