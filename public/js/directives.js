var myDirectives = angular.module('myDirectives', []);

//  animate "You entered an invalid username and/or password" 
//  so if a user enters the wrong thing twice in a row they will at least know it registered an attempt

myDirectives.directive('cmFormValidator', function() {
	return {
		restrict: "A",
		scope: {
			login: '=loginModel',
			signIn: '&submitFunc'
		},
		link: function (scope, elm, attrs) {
			elm[0].addEventListener('invalid', function(e) {
				e.preventDefault();
			}, true);
			scope.formClick = function (e) {
				scope.errorPresent = false;
				var formName = attrs.name;
				elm.removeClass('error');
				if (scope[formName].$error.required) {
					scope.errorPresent = true;
					elm.addClass('error');
				};
			};
		}
	}
});