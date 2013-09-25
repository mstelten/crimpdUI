function ExerciseEditCtrl ($scope, exerciseData, $timeout, allMeta, exerciseModel, isNewExr, formDataObject, $http) {
	$scope.panes = {
		basicInfo: true
	};
	$scope.$on('LOADING', function () {
		$scope.loading = true;
	});
	$scope.$on('UNLOADING', function () {
		$scope.loading = false;
	});
	var currentMetaArray = [];

	// gets full list of metaData from resolve
	$scope.allMeta = allMeta;

	// gets current exercise data from resolve
	$scope.exerciseModel = exerciseModel;
	$scope.isNewExr = isNewExr;

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

	// fires on Basic Info form submit
	$scope.addOrEditExercise = function () {
		$scope.editExercise();
	};

	// updates basic exercise, adds new metadata, removes now un-checked metadata
	$scope.editExercise = function () {
		$scope.$emit('LOAD');
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
				$scope.$emit('UNLOAD');
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
			$scope.$emit('UNLOAD');
		};
	};

	// set current image to edit
	$scope.setCurrentImg = function (passedId) {
		var imagesArray = $scope.exerciseModel.images;
		var index;
		for (var i = 0; i < imagesArray.length; i += 1) {
			if (imagesArray[i].id === passedId) {
				index = i;
			}
		}
		$scope.imageFormUtils = {
			id: passedId,
			caption: imagesArray[index].caption,
			preview: imagesArray[index].preview,
			imgIndex: index
		}
		$scope.$broadcast('newImageEdit');
	};

	// stops the current image editing
	$scope.stopEditingImg = function () {
		$scope.imageFormUtils = {};
	};

	// deletes the current image editing
	$scope.deleteImg = function () {
		$scope.$emit('LOAD');
		exerciseData.deleteImage($scope.exerciseModel.id, $scope.imageFormUtils.id).then(function (data) {
			$scope.$emit('UNLOAD');
			$scope.deleteImgRes = data;
			if ($scope.deleteImgRes.success) {
				$scope.exerciseModel = $scope.deleteImgRes.exercise;
				$scope.exerciseModel.message = "image deleted";
				$scope.imageFormUtils = {
					clicked: true,
					success: true
				};
				$timeout(function () {
					$scope.imageFormUtils.success = false;
				}, 2000);
			} else {
				$scope.exerciseModel.errorMessages = $scope.deleteImgRes.errors;
				$scope.imageFormUtils.clicked = true;
			}
		});
	};

	// fires on image form submit
	$scope.addOrEditImage = function () {
		var addImage = function () {
			$scope.$emit('LOAD');
			$http({
				method: 'POST',
				url: config.apiUrl + '/exercise/basic/' + $scope.exerciseModel.id + '/image',
				headers: {
					'Content-Type': false
				},
				data: {
					file: $scope.imageFormUtils.imgFile,
					caption: $scope.imageFormUtils.caption,
					preview: $scope.imageFormUtils.preview || false
				},
				transformRequest: formDataObject
			}).then(function (data) {
					$scope.addEditImageRes = data.data;
					$scope.processImage();
				});
		};
		var editImage = function () {
			$scope.$emit('LOAD');
			exerciseData.editImage($scope.exerciseModel.id, $scope.imageFormUtils.id, $scope.imageFormUtils.caption, $scope.imageFormUtils.preview).then(function (data) {
				$scope.addEditImageRes = data;
				$scope.processImage();
			});
		};
		if ($scope.imageFormUtils.id) {
			editImage();
		} else {
			addImage();
		}
	};

	$scope.processImage = function () {
		$scope.$emit('UNLOAD');
		if ($scope.addEditImageRes.success) {
			$scope.exerciseModel = $scope.addEditImageRes.exercise;
			if ($scope.imageFormUtils.id) {
				$scope.exerciseModel.message = "image #2 updated";
			} else {
				$scope.exerciseModel.message = "new image added";
			}
			$scope.imageFormUtils = {
				clicked: true,
				success: true
			};
			$timeout(function () {
				$scope.imageFormUtils.success = false;
			}, 2000);
		} else {
			$scope.exerciseModel.errorMessages = $scope.addEditImageRes.errors;
			$scope.imageFormUtils.clicked = true;
		}
	};
}

ExerciseEditCtrl.resolve = {
	allMeta: function ($q, $http) {
		var deferred = $q.defer();
		$http.get(config.apiUrl + '/exercise/meta').success(function (data) {
			deferred.resolve(data.exerciseMeta);
		});
		return deferred.promise;
	},
	exerciseModel: function ($http, $route, $q) {
		var deferred = $q.defer();
		$http.get(config.apiUrl + '/exercise/' + $route.current.params.exerciseId).success(function (data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	},
	isNewExr: function (exerciseData) {
		return exerciseData.getIsNewExr();
	}
};