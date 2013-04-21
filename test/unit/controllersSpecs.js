describe('Unit Testing: Header Controller', function () {

	var $scope, ctrl;

	beforeEach(module('myServices'));
	beforeEach(inject(function ($rootScope, $controller) {
		$scope = $rootScope.$new();
		ctrl = $controller('HeaderCtrl', {
			$scope: $scope
		});
	}));

	it('currentUser model should not be null', inject(function () {
		expect($scope.currentUser).not.toBeNull()
	}));

	it('signOut function send ajax request to sign user out & updates user to GUEST', inject(function ($httpBackend) {
		$httpBackend.when('GET', 'http://test.crimpd.com/crimpd/auth/logout').respond({"success": {"message": "You have successfully logged out"}});
		var $event = {
			preventDefault: function() {return 1}
		};
		$scope.signOut($event);
		expect($scope.currentUser).toEqual({name: 'guest', role: 0});
	}));

});