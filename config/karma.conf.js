basePath = '../';

files = [
	JASMINE,
	JASMINE_ADAPTER,

	//3rd Party Code
	'./public/js/lib/angular.min.js',
	'./public/js/lib/angular-mocks.js',
	'./public/js/lib/jquery-1.9.1.min.js',
	'./public/js/lib/underscore-min.js',

	//App-specific Code
	'./public/js/common/config.js',
	'./public/js/common/router.js',
	'./public/js/common/form.directives.js',
	'./public/js/common/view.ctrl.js',
	'./public/js/exercise/search.ctrl.js',
	'./public/js/exercise/exercise.srvs.js',
	'./public/js/section/community.ctrl.js',
	'./public/js/session/session.ctrls.js',
	'./public/js/user/header.ctrl.js',
	'./public/js/user/login.ctrl.js',
	'./public/js/user/oauth.ctrl.js',
	'./public/js/user/register.ctrl.js',
	'./public/js/user/settings.ctrl.js',
	'./public/js/user/user.srvs.js',

	//Test-Specs
	'./test/unit/*.js'
];

port = 9201;
runnerPort = 9301;
captureTimeout = 5000;

growl = true;
colors = true;
autoWatch = false;
singleRun = true;
browsers = ['Chrome'];
reporters = ['progress'];