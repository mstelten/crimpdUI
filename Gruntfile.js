module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			jsANDhtml: {
				files: ['public/js/**/*.js', 'public/partials/*.html', '/views/index.html'],
				options: {
					livereload: true,
				}
			},
			css: {
				files: 'public/css/*.less',
				tasks: ['less'],
				options: {
					livereload: true,
				}
			}
		},
		less: {
			development: {
				options: {
					paths: ["public/css"]
				}
			}
		},
		bgShell: {
			runNode: {
				cmd: 'sudo node app.js',
				bg: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-bg-shell');

	grunt.registerTask('dev', ['bgShell', 'watch']);

};