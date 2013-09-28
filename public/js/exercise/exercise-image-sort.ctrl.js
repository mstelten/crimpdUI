function ImageSortCtrl ($scope, $modalInstance, images) {

	$scope.images = images;

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

}