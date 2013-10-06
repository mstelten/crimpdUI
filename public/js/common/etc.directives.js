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

myDirectives.directive('cmImageSorting', function (exerciseData, $timeout) {
	return {
		restrict: "A",
		scope: false,
		link: function (scope) {
			scope.sortableOptions = {
				placeholder: 'imagePlaceholder'
			};
			var currentImgArray = [];
			scope.startSortImages = function () {
				currentImgArray = angular.copy(scope.formModel.images);
				scope.sorting = true;
			};
			scope.cancelSortImages = function () {
				scope.sorting = false;
				scope.formModel.images = currentImgArray;
			};
			scope.saveSortImages = function () {
				scope.$emit('LOAD');
				scope.sorting = false;
				var sortedArray = [];
				for (var i=0; i < scope.formModel.images.length; i++) {
					sortedArray.push(scope.formModel.images[i].id.toString());
				}
				exerciseData.sortImages(scope.formModel.id, sortedArray).then(function (data) {
					scope.$emit('UNLOAD');
					scope.sortImageRes = data;
					if (scope.sortImageRes.success) {
						scope.formModel = scope.sortImageRes.exercise;
						scope.formModel.message = "sort order updated";
						scope.formUtils = {
							clicked: true,
							success: true
						};
						$timeout(function () {
							scope.formUtils.success = false;
						}, 2000);
					} else {
						scope.formModel.errorMessages = scope.sortImageRes.errors;
						scope.formUtils = {
							clicked: true
						};
					}
				});
			};
		}
	}
});

myDirectives.directive('cmFixedFloating', function () {
	return {
		restrict: "A",
		scope: false,
		link: function (scope, elm) {
			var offset = $(elm).offset().top;
			$(window).scroll(function () {
				if ($(window).scrollTop() >= offset) {
					elm.addClass('fixed');
				} else {
					elm.removeClass('fixed');
				}
			});
		}
	}
});