function ExerciseSearchCtrl($scope, exerciseData) {
	$scope.exercises = {};
	exerciseData.queryAllExercises().then(function(data) {
		$scope.exercises = data.exercises;
	});

	$scope.isCleanSlate = function () {
		return (_.every(_.values($scope.search), function (x) {
			return (x === "" || x === null);
		}))
	};
	$scope.search = exerciseData.getCachedSearch();
	$scope.clearFilters = function () {
		var clean = {
			Target: "",
			Difficulty: "",
			Type: "",
			Equipment: "",
			$: ""
		};
		$scope.search = clean;
		exerciseData.updateCachedSearch(clean);
	};
	$scope.targetOptions = function () {
		var targets = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.Difficulty || _.contains($scope.exercises[i].Difficulty, $scope.search.Difficulty))
			&& (!$scope.search.Type || _.contains($scope.exercises[i].Type, $scope.search.Type))
			&& (!$scope.search.Equipment || _.contains($scope.exercises[i].Equipment, $scope.search.Equipment))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function(z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function(zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].Target != undefined) {
					for (var j = 0; j < $scope.exercises[i].Target.length; j++) {
						if (targets.indexOf($scope.exercises[i].Target[j]) == -1)
							targets.push($scope.exercises[i].Target[j]);
					}
				}
			}
		}
		return targets;
	};
	$scope.difficultyOptions = function () {
		var difficulties = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.Target || _.contains($scope.exercises[i].Target, $scope.search.Target))
			&& (!$scope.search.Type || _.contains($scope.exercises[i].Type, $scope.search.Type))
			&& (!$scope.search.Equipment || _.contains($scope.exercises[i].Equipment, $scope.search.Equipment))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function (z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function(zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].Difficulty != undefined) {
					for (var j = 0; j < $scope.exercises[i].Difficulty.length; j++) {
						if (difficulties.indexOf($scope.exercises[i].Difficulty[j]) == -1)
							difficulties.push($scope.exercises[i].Difficulty[j]);
					}
				}
			}
		}
		return difficulties;
	};
	$scope.typeOptions = function () {
		var types = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.Target || _.contains($scope.exercises[i].Target, $scope.search.Target))
			&& (!$scope.search.Difficulty || _.contains($scope.exercises[i].Difficulty, $scope.search.Difficulty))
			&& (!$scope.search.Equipment || _.contains($scope.exercises[i].Equipment, $scope.search.Equipment))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function (z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function (zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].Type != undefined) {
					for (var j = 0; j < $scope.exercises[i].Type.length; j++) {
						if (types.indexOf($scope.exercises[i].Type[j]) == -1)
							types.push($scope.exercises[i].Type[j]);
					}
				}
			}
		}
		return types;
	};
	$scope.equipmentOptions = function () {
		var equipments = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.Target || _.contains($scope.exercises[i].Target, $scope.search.Target))
			&& (!$scope.search.Difficulty || _.contains($scope.exercises[i].Difficulty, $scope.search.Difficulty))
			&& (!$scope.search.Type || _.contains($scope.exercises[i].Type, $scope.search.Type))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function (z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function (zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].Equipment != undefined) {
					for (var j = 0; j < $scope.exercises[i].Equipment.length; j++) {
						if (equipments.indexOf($scope.exercises[i].Equipment[j]) == -1)
							equipments.push($scope.exercises[i].Equipment[j]);
					}
				}
			}
		}
		return equipments;
	}
}