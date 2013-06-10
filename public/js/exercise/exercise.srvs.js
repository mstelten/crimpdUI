myServices.factory('exerciseData', function ($http, $q) {
	return {
		queryAllExercises: function () {
			var deferred = $q.defer();
			$http.get(config.apiUrl + '/exercise').success(function(data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		}
	}
});
