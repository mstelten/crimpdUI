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