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
			scope.formClick = function () {
				scope.errorPresent = false;
				scope.formModel.clicked = false;
				elm.removeClass('error');
				if (scope[attrs.name].$error.required) {
					scope.errorPresent = true;
					elm.addClass('error');
				};
			};
		}
	}
});

myDirectives.directive('cmUsernameInput', ['$http', function ($http) {
	return {
		restrict: "A",
		link: function (scope, elm) {
			$(elm).on('blur', function() {
				checkUserName();
			});
			var checkUserName = function() {
				$http.get('http://api.crimpd.com/crimpd/registration/' + elm.val()).
					success(function(data) {
						if (data.success) {
							alert('you good');
							// mark as valid?  $setValidity
						} else {
							alert('username already exists');
							// make it as errorous w/ message
							// mark form as invalid until non-errorous
						}
					});
			};
		}
	}
}]);