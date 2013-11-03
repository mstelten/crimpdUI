myServices.factory('exerciseData', function ($http, $q) {
	var cachedSearch = {
		target: "",
		difficulty: "",
		type: "",
		equipment: "",
		$: ""
	};
	var isNewExr = false;
	return {
		getCachedSearch: function () {
			return cachedSearch;
		},
		updateCachedSearch: function (searchObj) {
			cachedSearch = searchObj;
		},
		getIsNewExr: function () {
			return angular.copy(isNewExr);
		},
		setIsNewExrTrue: function () {
			isNewExr = true;
		},
		setIsNewExrFalse: function () {
			isNewExr = false;
		},
		queryAllExercises: function () {
			return $http.get(config.apiUrl + '/exercise').then(function(result) {
				return result.data;
			});
		},
		querySingleExercise: function (exrId) {
			return $http.get(config.apiUrl + '/exercise/' + exrId).then(function (result) {
				return result.data;
			});
		},
		queryAllMeta: function () {
			return $http.get(config.apiUrl + '/exercise/meta').then(function (result) {
				return result.data;
			});
		},
		createBasic: function (name, desc) {
			return $http.post(config.apiUrl + '/exercise/basic', {'exercise': {'name': name, 'description': desc}}).then(function (result) {
				return result.data;
			});
		},
		updateBasic: function (name, desc, exerciseId, addMetaArray, removeMetaArray) {
			return $http.put(config.apiUrl + '/exercise/basic/' + exerciseId, {'exercise': {'name': name, 'description': desc, 'addMeta': addMetaArray, 'removeMeta': removeMetaArray}}).then(function (result) {
				return result.data;
			});
		},
		addMeta: function (exerciseId, metaIdArray) {
			return $http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/addMeta', {'exerciseMetaId': metaIdArray}).then(function (result) {
				return result.data;
			});
		},
		removeMeta: function (exerciseId, metaIdArray) {
			return $http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/removeMeta', {'exerciseMetaId': metaIdArray}).then(function (result) {
				return result.data;
			});
		},
		editImage: function (exerciseId, imageId, imgCaption, imgPreview) {
			return $http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/image', {'exerciseImage': {'id': imageId, 'caption': imgCaption, 'preview': imgPreview}}).then(function (result) {
				return result.data;
			});
		},
		deleteImage: function (exerciseId, imageId) {
			return $http({
				method: 'DELETE',
				url: config.apiUrl + '/exercise/basic/' + exerciseId + '/image',
				data: {'exerciseImage': {'id': imageId}}
			}).then(function (result) {
					return result.data;
				});
		},
		sortImages: function (exerciseId, sortedArray) {
			return $http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/sortImages', {'images': sortedArray}).then(function (result) {
				return result.data;
			});
		}
	}
});