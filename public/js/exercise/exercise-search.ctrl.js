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
			target: "",
			difficulty: "",
			type: "",
			equipment: "",
			$: ""
		};
		$scope.search = clean;
		exerciseData.updateCachedSearch(clean);
	};
	$scope.targetOptions = function () {
		var targets = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.difficulty || _.contains($scope.exercises[i].difficulty, $scope.search.difficulty))
			&& (!$scope.search.type || _.contains($scope.exercises[i].type, $scope.search.type))
			&& (!$scope.search.equipment || _.contains($scope.exercises[i].equipment, $scope.search.equipment))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function(z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function(zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].target != undefined) {
					for (var j = 0; j < $scope.exercises[i].target.length; j++) {
						if (targets.indexOf($scope.exercises[i].target[j]) == -1)
							targets.push($scope.exercises[i].target[j]);
					}
				}
			}
		}
		return targets;
	};
	$scope.difficultyOptions = function () {
		var difficulties = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.target || _.contains($scope.exercises[i].target, $scope.search.target))
			&& (!$scope.search.type || _.contains($scope.exercises[i].type, $scope.search.type))
			&& (!$scope.search.equipment || _.contains($scope.exercises[i].equipment, $scope.search.equipment))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function (z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function(zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].difficulty != undefined) {
					for (var j = 0; j < $scope.exercises[i].difficulty.length; j++) {
						if (difficulties.indexOf($scope.exercises[i].difficulty[j]) == -1)
							difficulties.push($scope.exercises[i].difficulty[j]);
					}
				}
			}
		}
		return difficulties;
	};
	$scope.typeOptions = function () {
		var types = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.target || _.contains($scope.exercises[i].target, $scope.search.target))
			&& (!$scope.search.difficulty || _.contains($scope.exercises[i].difficulty, $scope.search.difficulty))
			&& (!$scope.search.equipment || _.contains($scope.exercises[i].equipment, $scope.search.equipment))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function (z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function (zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].type != undefined) {
					for (var j = 0; j < $scope.exercises[i].type.length; j++) {
						if (types.indexOf($scope.exercises[i].type[j]) == -1)
							types.push($scope.exercises[i].type[j]);
					}
				}
			}
		}
		return types;
	};
	$scope.equipmentOptions = function () {
		var equipments = [];
		for (var i = 0; i < $scope.exercises.length; i++) {
			if ((!$scope.search.target || _.contains($scope.exercises[i].target, $scope.search.target))
			&& (!$scope.search.difficulty || _.contains($scope.exercises[i].difficulty, $scope.search.difficulty))
			&& (!$scope.search.type || _.contains($scope.exercises[i].type, $scope.search.type))
			&& (!$scope.search.$ || _.some(_.values($scope.exercises[i]), function (z) {
				if (_.isString(z)) {
					if (z.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1) return true;
				} else if (_.isArray(z)) {
					return _.some(z, function (zz) {
						return zz.toLowerCase().indexOf($scope.search.$.toLowerCase()) > -1;
					});
				}
			}))) {
				if ($scope.exercises[i].equipment != undefined) {
					for (var j = 0; j < $scope.exercises[i].equipment.length; j++) {
						if (equipments.indexOf($scope.exercises[i].equipment[j]) == -1)
							equipments.push($scope.exercises[i].equipment[j]);
					}
				}
			}
		}
		return equipments;
	}
}