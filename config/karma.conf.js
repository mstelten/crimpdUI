module.exports = function (config) {
	config.set({
		basePath: '../',
		frameworks: ['jasmine'],
		files: [
			//3rd Party Code
			'./public/js/lib/jquery.js',
			'./public/js/lib/angular.js',
			'./public/js/lib/angular-mocks.js',
			'./public/js/lib/angular-animate.js',
			'./public/js/lib/angular-route.js',
			'./public/js/lib/angular-touch.js',
			'./public/js/lib/bootstrap.js',
			'./public/js/lib/sortable.js',
			'./public/js/lib/underscore.js',
			'./public/js/lib/jquery-ui-custom.js',

			//App-specific Code
			'./public/js/common/*.js',
			'./public/js/exercise/*.js',
			'./public/js/section/*.js',
			'./public/js/session/*.js',
			'./public/js/user/*.js',

			//Test-Specs
			'./test/unit/*.js'
		],
		port: 9201,
		runnerPort: 9301,
		captureTimeout: 5000,

		growl: true,
		colors: true,
		autoWatch: false,
		singleRun: true,
		browsers: ['Chrome'],
		reporters:['progress']
	});
};