var myDirectives = angular.module('myDirectives', []);

//  animate "You entered an invalid username and/or password" 
//  so if a user enters the wrong thing twice in a row they will at least know it registered an attempt

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
				elm.removeClass('error');
				if (scope[attrs.name].$error.required) {
					scope.errorPresent = true;
					elm.addClass('error');
				};
			};
		}
	}
});