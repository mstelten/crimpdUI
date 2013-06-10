function ExerciseSearchCtrl($scope, exerciseData) {
	exerciseData.queryAllExercises().then(function(data) {
		$scope.exercises = data.exercises.map(function(d) {
			var metadata = d.metadata;
			var types = metadata.map(function (d2) {
				return d2.type.toLowerCase();
			});
			var names = metadata.map(function (d2) {
				return d2.name;
			});
			for (i = 0; i < types.length; i++) {
				d[types[i]] = names[i];
			}
			return d;
		});
	});
}