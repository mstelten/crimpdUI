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
			var deferred = $q.defer();
			$http.get(config.apiUrl + '/exercise').success(function(data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		querySingleExercise: function (exrId) {
			var deferred = $q.defer();
			$http.get(config.apiUrl + '/exercise/' + exrId).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		queryAllMeta: function () {
			var deferred = $q.defer();
			$http.get(config.apiUrl + '/exercise/meta').success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		createBasic: function (name, desc) {
			var deferred = $q.defer();
			$http.post(config.apiUrl + '/exercise/basic', {'exercise': {'name': name, 'description': desc}}).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		updateBasic: function (name, desc, exerciseId, addMetaArray, removeMetaArray) {
			var deferred = $q.defer();
			$http.put(config.apiUrl + '/exercise/basic/' + exerciseId, {'exercise': {'name': name, 'description': desc, 'addMeta': addMetaArray, 'removeMeta': removeMetaArray}}).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		addMeta: function (exerciseId, metaIdArray) {
			var deferred = $q.defer();
			$http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/addMeta', {'exerciseMetaId': metaIdArray}).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		removeMeta: function (exerciseId, metaIdArray) {
			var deferred = $q.defer();
			$http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/removeMeta', {'exerciseMetaId': metaIdArray}).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		editImage: function (exerciseId, imageId, imgCaption, imgPreview) {
			var deferred = $q.defer();
			$http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/image', {'exerciseImage': {'id': imageId, 'caption': imgCaption, 'preview': imgPreview}}).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		deleteImage: function (exerciseId, imageId) {
			var deferred = $q.defer();
			$http({
				method: 'DELETE',
				url: config.apiUrl + '/exercise/basic/' + exerciseId + '/image',
				data: {'exerciseImage': {'id': imageId}}
			}).success(function (data) {
					deferred.resolve(data);
				});
			return deferred.promise;
		},
		sortImages: function (exerciseId, sortedArray) {
			var deferred = $q.defer();
			$http.put(config.apiUrl + '/exercise/basic/' + exerciseId + '/sortImages', {'images': sortedArray}).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		}
	}
});