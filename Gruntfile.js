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
				files: ['public/js/**/*.js', 'public/partials/*.html', 'public/index.html'],
				options: {
					livereload: true
				}
			},
			css: {
				files: 'public/css/*.less',
				options: {
					livereload: true
				},
				tasks: ['less']
			}
		},
		clean: {
			before:{
				src:['bin','.tmp']
			},
			after: {
				src:['.tmp']
			}
		},
		less: {
			dev: {
				options: {
					paths: ["public/css"]
				},
				files: [{
					expand: true,
					cwd: 'public/css',
					src: ['*.less'],
					dest: 'public/css',
					ext: '.css'
				}]
			}
		},
		'sails-linker': {
			appScripts: {
				options: {
					startTag: '<!--APP SCRIPTS-->',
					endTag: '<!--APP SCRIPTS END-->',
					fileTmpl: '<script src="%s"></script>',
					appRoot: 'public/'
				},
				files: {
					'public/index.html': ['public/js/common/*.js','public/js/exercise/*.js','public/js/section/*.js','public/js/session/*.js','public/js/user/*.js']
				}
			}
		},
		useminPrepare: {
			html: 'public/index.html',
			options: {
				dest: 'bin'
			}
		},
		usemin: {
			html: 'bin/index.html'
		},
		ngtemplates: {
			app: {
				src: ['public/partials/*.html'],
				dest: '.tmp/templates.js',
				options: {
					module: 'crimpdApp',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
				}
			}
		},
		concat: {
			addTemplate: {
				src: [ '.tmp/concat/js/app.full.min.js', '.tmp/templates.js' ],
				dest: '.tmp/concat/js/app.full.min.js'
			}
		},
		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			files: {
				src: [
					'bin/css/app.full.min.css',
					'bin/js/app.full.min.js'
				]
			}
		},
		copy: {
			main: {
				files: [{
					cwd: 'public/',
					src: ['img/**', 'index.html'],
					dest: 'bin/',
					expand: true
				}]
			}
		},
		ngmin: {
			all: {
				src: '.tmp/concat/js/app.full.min.js',
				dest: '.tmp/concat/js/app.full.min.js'
			}
		},
		processhtml: {
			dist: {
				files: {
					'bin/index.html': 'bin/index.html'
				}
			}
		},
		htmlmin: {
			main: {
				options: {
					removeComments: false,
					collapseWhitespace: true
				},
				files: {
					'bin/index.html': 'bin/index.html'
				}
			}
		},
		imagemin: {
			main:{
				files: [{
					expand: true,
					cwd:'bin/',
					src:['**/{*.png,*.jpg}'],
					dest: 'bin/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-bg-shell');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-sails-linker');
	grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-filerev');

	grunt.registerTask('server', [
		'sails-linker:appScripts',
		'bgShell',
		'watch'
	]);
	grunt.registerTask('build', [
		'clean:before',
		'less',
		'sails-linker:appScripts',
		'copy:main',
		'useminPrepare',
		'ngtemplates',
		'concat:generated',
		'concat:addTemplate',
		'ngmin',
		'uglify',
		'cssmin',
		'filerev',
		'usemin',
        'processhtml',
		'htmlmin',
		'imagemin',
		'clean:after'
	]);
};
