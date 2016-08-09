module.exports = function (grunt) {
	var LIVE_RELOAD_PORT = 35729;

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			html: {
				cwd: './src',
				src: '**/*.html',
				dest: './dist/',
				expand: true
			}
		},
		sass: {
			dist: {
				files: {
					'./dist/index.css': './src/index.scss'
				}
			}
		},
		browserify: {
			dist: {
				files: {
					'./dist/index.js': './src/index.js'
				}
			}
		},
		watch: {
			html: {
				files: ['./src/**/*.html'],
				tasks: ['html'],
				options: {
					livereload: LIVE_RELOAD_PORT
				}
			},
			styles: {
				files: ['./src/**/*.scss'],
				tasks: ['styles'],
				options: {
					livereload: LIVE_RELOAD_PORT
				}
			},
			scripts: {
				files: ['./src/**/*.js'],
				tasks: ['scripts'],
				options: {
					livereload: LIVE_RELOAD_PORT
				}
			}
		},
		concurrent: {
			watch: ['watch'],
			server: ['server']
		},
		connect: {
			server: {
				options: {
					keepalive: true,
					port: 8080,
					base: './dist',
					livereload: LIVE_RELOAD_PORT
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('html', ['copy:html']);
	grunt.registerTask('styles', ['sass:dist']);
	grunt.registerTask('scripts', ['browserify:dist']);
	grunt.registerTask('server', ['connect:server']);

	grunt.registerTask('build', ['html', 'styles', 'scripts']);
	grunt.registerTask('serve', ['build', 'server', 'watch']);
	grunt.registerTask('default', ['serve']);
};