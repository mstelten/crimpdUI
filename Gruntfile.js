module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bgShell: {
			runNode: {
				cmd: 'sudo node app.js',
				bg: true
			}
		},
		watch: {
			jsANDhtml: {
				files: ['public/js/**/*.js', 'public/partials/*.html', '/views/index.html'],
				options: {
					livereload: true
				}
			},
			css: {
				files: 'public/css/*.less',
				tasks: ['less:dev'],
				options: {
					livereload: true
				}
			}
		},
		clean: {
			before:{
				src:['bin','temp']
			},
			after: {
				src:['temp']
			}
		},
		less: {
			dev: {
				options: {
					paths: ["public/css"]
				}
			},
			prod: {
				options: {
				},
				files: {
					"temp/app.css": "css/app.less"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-bg-shell');

	grunt.registerTask('server', ['bgShell', 'watch']);
	grunt.registerTask('build', ['clean:before', 'clean:after']);

};