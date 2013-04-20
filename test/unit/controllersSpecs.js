describe('Unit: Testing Controllers', function () {

	var $scope, ctrl;

	//you need to inject dependencies first
	beforeEach(inject(function ($rootScope) {
		$scope = $rootScope.$new();
	}));

	it('Should initialize value to Loading', inject(function ($controller) {
		ctrl = $controller('TestCtrl', {
			$scope: $scope
		});
		expect($scope.name).toBe("testing...");
	}));
});