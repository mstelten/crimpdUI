basePath = '../';

files = [
	JASMINE,
	JASMINE_ADAPTER,

	//3rd Party Code
	'./public/js/lib/*.js',

	//App-specific Code
	'./public/js/common/*.js',
	'./public/js/exercise/*.js',
	'./public/js/section/*.js',
	'./public/js/session/*.js',
	'./public/js/user/*.js',

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