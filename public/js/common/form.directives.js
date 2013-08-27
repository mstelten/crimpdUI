myDirectives.directive('cmFormValidator', function() {
	return {
		restrict: "A",
		scope: {
			formModel: '=formModel',
			submit: '&submitFunc',
			formClicked: '=formClicked'
		},
		link: function (scope, elm, attrs) {
			elm[0].addEventListener('invalid', function(e) {
				e.preventDefault();
			}, true);
			scope.thisForm = scope[attrs.name];
			scope.formClick = function ($event) {
				scope.errorPresent = false;
				scope.formClicked = false;
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

myDirectives.directive('bsTabs', [
	'$parse',
	'$compile',
	'$timeout',
	function ($parse, $compile, $timeout) {
		var template = '<div class="tabs">' + '<ul class="nav nav-tabs">' + '<li ng-repeat="pane in panes" ng-class="{active:pane.active}">' + '<a data-target="#{{pane.id}}" data-index="{{$index}}" data-toggle="tab">{{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content" ng-transclude>' + '</div>';
		return {
			restrict: 'A',
			require: '?ngModel',
			priority: 0,
			scope: true,
			template: template,
			replace: true,
			transclude: true,
			compile: function compile(tElement, tAttrs, transclude) {
				return function postLink(scope, iElement, iAttrs, controller) {
					var getter = $parse(iAttrs.bsTabs), setter = getter.assign, value = getter(scope);
					scope.panes = [];
					var $tabs = iElement.find('ul.nav-tabs');
					var $panes = iElement.find('div.tab-content');
					var activeTab = 0, id, title, active;
					$timeout(function () {
						$panes.find('[data-title], [data-tab]').each(function (index) {
							var $this = angular.element(this);
							id = 'tab-' + scope.$id + '-' + index;
							title = $this.data('title') || $this.data('tab');
							active = !active && $this.hasClass('active');
							$this.attr('id', id).addClass('tab-pane');
							if (iAttrs.fade)
								$this.addClass('fade');
							scope.panes.push({
								id: id,
								title: title,
								content: this.innerHTML,
								active: active
							});
						});
						if (scope.panes.length && !active) {
							$panes.find('.tab-pane:first-child').addClass('active' + (iAttrs.fade ? ' in' : ''));
							scope.panes[0].active = true;
						}
					});
					if (controller) {
						iElement.on('show', function (ev) {
							var $target = $(ev.target);
							scope.$apply(function () {
								controller.$setViewValue($target.data('index'));
							});
						});
						scope.$watch(iAttrs.ngModel, function (newValue, oldValue) {
							if (angular.isUndefined(newValue))
								return;
							activeTab = newValue;
							setTimeout(function () {
								var $next = $($tabs[0].querySelectorAll('li')[newValue * 1]);
								if (!$next.hasClass('active')) {
									$next.children('a').tab('show');
								}
							});
						});
					}
				};
			}
		};
	}
]);