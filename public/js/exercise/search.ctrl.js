function ExerciseSearchCtrl($scope, exerciseData) {
	$scope.exercises = {};
	exerciseData.queryAllExercises().then(function(data) {
		$scope.exercises = data.exercises;
	});
	$scope.search = {
		Target: "",
		Difficulty: "",
		$: ""
	}
	$scope.targetOptions = function () {
		var targets = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.Difficulty || _.contains($scope.exercises[i].Difficulty, $scope.search.Difficulty))
				&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function(z) {
					if (_.isString(z)) {
						if (z.indexOf($scope.search.$) > -1) return true;
					}}))) {
						for (var j = 0; j < $scope.exercises[i].Target.length; j++) {
							if (targets.indexOf($scope.exercises[i].Target[j]) == -1)
								targets.push($scope.exercises[i].Target[j]);
						}
			}
		}
		return targets;
	}
	$scope.difficultyOptions = function () {
		var difficulties = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.Target || _.contains($scope.exercises[i].Target, $scope.search.Target))
				&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function (z) {
				if (_.isString(z)) {
					if (z.indexOf($scope.search.$) > -1) return true;
				}}))) {
					for (var j = 0; j < $scope.exercises[i].Difficulty.length; j++) {
						if (difficulties.indexOf($scope.exercises[i].Difficulty[j]) == -1)
							difficulties.push($scope.exercises[i].Difficulty[j]);
					}
			}
		}
		return difficulties;
	}
}