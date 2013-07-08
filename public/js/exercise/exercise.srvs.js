myServices.factory('exerciseData', ['$http', '$q', function ($http, $q) {
	return {
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
		}
	}
}]);
