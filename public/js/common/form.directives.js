myDirectives.directive('cmFormValidator', function() {
	return {
		restrict: "A",
		scope: {
			formModel: '=formModel',
			submit: '&submitFunc',
			formUtils: '=formUtils'
		},
		link: function (scope, elm, attrs) {
			elm[0].addEventListener('invalid', function(e) {
				e.preventDefault();
			}, true);
			scope.thisForm = scope[attrs.name];
			scope.formClick = function ($event) {
				scope.errorPresent = false;
				if (scope.formUtils) {
					scope.formUtils.clicked = false;
				} else {
					scope.formUtils= {
						clicked: false
					};
				}
				elm.removeClass('error');
				if (scope.thisForm.$error.required || scope.thisForm.$error.email) {
					scope.errorPresent = true;
					elm.addClass('error');
					$event.preventDefault();
				} else if (scope.thisForm.$error.duplicate) {
					if (scope.thisForm.$error.duplicate[0].$invalid) {
						scope.errorPresent = true;
						elm.addClass('error');
						$event.preventDefault();
					}
				}
			};
			scope.$on('removeFormError', function () {
				scope.errorPresent = false;
				elm.removeClass('error');
			});
		}
	}
});

myDirectives.directive('cmUsernameInput', function ($http) {
	return {
		restrict: "A",
		link: function (scope, elm, attrs) {
			$(elm).on('blur', function() {
				scope.$apply(checkUserName());
			});
			var checkUserName = function() {
				$http.get(config.apiUrl + '/registration/' + elm.val()).
					success(function(data) {
						if (data.success) {
							console.log("username is unique");
							scope[attrs.parentForm].inputUserName.$setValidity("duplicate", true);
						} else {
							console.log('username already exists');
							scope[attrs.parentForm].inputUserName.$setValidity("duplicate", false);
						}
					});
			};
		}
	}
});

myDirectives.factory('formDataObject', function () {
	return function (data) {
		var fd = new FormData();
		angular.forEach(data, function (value, key) {
			fd.append(key, value);
		});
		return fd;
	};
});

myDirectives.directive('cmFileUpload', function () {
	return {
		scope: false,
		link: function (scope, elm) {
			elm.on('change', function (event) {
				var files = event.target.files;
				var file = files[0];
				if (scope.formUtils) {
					scope.formUtils.imgFile = file ? file : undefined;
				} else {
					scope.formUtils = {
						imgFile: file ? file : undefined
					}
				}
				scope.$apply();
			});
		}
	};
});