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

	it('signOut function send ajax request - signs user out & updates user to NOOB', inject(function ($httpBackend, userInfo) {
		$httpBackend.when('GET', 'http://test.crimpd.com/crimpd/auth/logout').respond({"success": {"message": "You have successfully logged out"}});
		var $event = {
			preventDefault: function() {return 1}
		};
		$scope.signOut($event);
		expect(userInfo.getUser()).toEqual({name: 'noob', role: 0});
	}));

});