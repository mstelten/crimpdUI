myServices.factory('exerciseData', function ($http, $q) {
	var cachedSearch = {
		Target: "",
		Difficulty: "",
		Type: "",
		Equipment: "",
		$: ""
	}
	return {
		getCachedSearch: function () {
			return cachedSearch;
		},
		updateCachedSearch: function (searchObj) {
			cachedSearch = searchObj;
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
		updateBasic: function (name, desc, exerciseId) {
			var deferred = $q.defer();
			$http.put(config.apiUrl + '/exercise/basic/' + exerciseId, {'exercise': {'name': name, 'description': desc}}).success(function (data) {
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
		}
	}
});