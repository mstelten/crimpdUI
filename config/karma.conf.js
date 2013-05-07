basePath = '../';

files = [
	JASMINE,
	JASMINE_ADAPTER,

	//3rd Party Code
	'./public/js/third-party/angular.min.js',
	'./public/js/third-party/angular-mocks.js',
	'./public/js/third-party/jquery-1.9.1.min.js',

	//App-specific Code
	'./public/js/router.js',
	'./public/js/uif-ctrls.js',
	'./public/js/exercises-ctrls.js',
	'./public/js/directives.js',
	'./public/js/services.js',

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