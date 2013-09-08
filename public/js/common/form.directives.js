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
				scope.formUtils= {
					clicked: false
				};
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

myDirectives.directive('cmCheckboxHighlight', function () {
	return {
		restrict: "A",
		scope: false,
		link: function (scope, elm) {
			scope.$watch(elm[0], function () {
				if (elm[0].value === true) {
					alert("checked now");
				}
			});
		}
	}
});