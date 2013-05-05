var myDirectives = angular.module('myDirectives', []);

myDirectives.directive('cmFormValidator', function() {
	return {
		restrict: "A",
		scope: {
			formModel: '=formModel',
			submit: '&submitFunc'
		},
		link: function (scope, elm, attrs) {
			elm[0].addEventListener('invalid', function(e) {
				e.preventDefault();
			}, true);
			scope.thisForm = scope[attrs.name];
			scope.formClick = function ($event) {
				scope.errorPresent = false;
				scope.formModel.clicked = false;
				elm.removeClass('error');
				if (scope.thisForm.$error.required || scope.thisForm.$error.email || scope.thisForm.$error.duplicate[0].$invalid) {
					scope.errorPresent = true;
					elm.addClass('error');
					$event.preventDefault();
				}
			};
		}
	}
});

myDirectives.directive('cmUsernameInput', ['$http', function ($http) {
	return {
		restrict: "A",
		link: function (scope, elm) {
			$(elm).on('blur', function() {
				scope.$apply(checkUserName());
			});
			var checkUserName = function() {
				$http.get('http://api.crimpd.com/crimpd/registration/' + elm.val()).
					success(function(data) {
						if (data.success) {
							console.log("username is unique");
							scope.registrationForm.inputUserName.$setValidity("duplicate", true);
						} else {
							console.log('username already exists');
							scope.registrationForm.inputUserName.$setValidity("duplicate", false);
						}
					});
			};
		}
	}
}]);