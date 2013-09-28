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

myDirectives.directive('cmImageSorting', function () {
	return {
		restrict: "A",
		scope: false,
		link: function (scope) {
			scope.startSortImages = function () {
				scope.sorting = true;
			};
			scope.saveSortImages = function () {
				scope.sorting = false;
			};
		}
	}
});
