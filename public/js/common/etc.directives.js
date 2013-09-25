myDirectives.directive('cmTabs', function () {
	return {
		restrict: "A",
		scope: false,
		link: function (scope) {
			scope.tabSelect = function (tabName) {
				scope.panes = {};
				scope.panes[tabName] = true;
			}
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
		link: function (scope, elm, attrs) {
			scope[attrs.parentForm].$setValidity("fileRequired", false);
			scope.$on('newImageEdit', function () {
				scope.errorPresent = false;
				scope[attrs.parentForm].$setValidity("fileRequired", false);
			});
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
				if (scope.formUtils) {
					if (scope.formUtils.imgFile) {
						scope[attrs.parentForm].$setValidity("fileRequired", true);
					}
				}
				scope.$apply();
			});
		}
	};
});