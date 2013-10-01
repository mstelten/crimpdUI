module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		tester: 'moeMemoeman',
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
				options: {
					livereload: true
				},
				tasks: ['less']
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
		ngtemplates: {
			main: {
				options: {
					module:'crimpdApp'
				},
				src: ['public/partials/*.html'],
				dest: 'temp/templates.js'
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
		dom_munger:{
			readscripts: {
				options: {
					read:{selector:'script[data-build!="exclude"]',attribute:'src',writeto:'appjs',isPath:true}
				},
				src:'public/index.html'
			},
			readcss: {
				options: {
					read:{selector:'link[data-build!="exclude"]',attribute:'href',writeto:'appcss',isPath:true}
				},
				src:'public/index.html'
			},
			removescripts: {
				options:{
					remove:'script[data-remove!="exclude"]'
				},
				src:'bin/index.html'
			},
			addscript: {
				options:{
					append:{selector:'head',html:'<script src="js/app.full.min.js"></script>'}
				},
				src:'bin/index.html'
			},
			removecss: {
				options:{
					remove:'link[data-build!="exclude"]'
				},
				src:'bin/index.html'
			},
			addcss: {
				options:{
					append:{selector:'meta[name=author]',html:'<link href="css/app.full.min.css" rel="stylesheet">'}
				},
				src:'bin/index.html'
			}
		},
		// Don't forget to delete "/*!" from Bootstrap comments
		cssmin: {
			main: {
				src:['<%= dom_munger.data.appcss %>'],
				dest:'bin/css/app.full.min.css'
			}
		},
		uglify: {
			options: {
				wrap: true
			},
			main: {
				src: ['<%= dom_munger.data.appjs %>','temp/templates.js'],
				dest: 'bin/js/app.full.min.js'
			}
		},
		htmlmin: {
			main: {
				options: {
					removeComments: true,
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
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-dom-munger');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('server', ['bgShell', 'watch']);
	grunt.registerTask('build', ['clean:before','less','dom_munger:readcss','dom_munger:readscripts','ngtemplates','copy:main','cssmin','uglify','dom_munger:removecss','dom_munger:addcss','dom_munger:removescripts','dom_munger:addscript','htmlmin','imagemin','clean:after']);
};