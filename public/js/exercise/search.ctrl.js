function ExerciseSearchCtrl($scope, $http, $location) {
	$scope.queryAll = function () {
		$http.get(config.apiUrl + '/exercise').
			success(function (data) {
				$scope.exercises = data.exercises;
			})
	};
	$scope.queryAll();
}