var config = require('./src/config.json');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: [ 'build' ],
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/', src: [ '**' ], dest: 'build' }
                ]
            }
        },
        config: {
            dev: {
                options: {
                    variables: {
                        'environment': 'dev'
                    }
                }
            },
            prod: {
                options: {
                    variables: {
                        'environment': 'prod'
                    }
                }
            }
        },
        replace: {
            dist: {
                options: {
                    variables: {
                        'environment': '<%= grunt.config.get("environment") %>'
                    },
                    force: true
                },
                files: [
                    {expand: true, flatten: true, src: ['build/config.json'], dest: 'build/'}
                ]
            }
        },
        cloudfiles: {
            prod: {
                'user': config.rackspace.username,
                'key': config.rackspace.apiKey,
                'upload': [
                    {
                        'container': config.container,
                        'src': 'build/public/**/*',
                        'dest': '/',
                        'stripcomponents': 2
                    }
                ]
            }
        }
    });

    // Load grunt plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-cloudfiles');
    grunt.loadNpmTasks('grunt-config');

    // Default task(s).
    grunt.registerTask('build', ['clean', 'copy', 'config:dev', 'replace']);
    grunt.registerTask('build:prod', ['clean', 'copy', 'config:prod', 'replace']);
    grunt.registerTask('publish', ['clean', 'copy', 'config:prod', 'replace', 'cloudfiles'])
    grunt.registerTask('default', 'build');

};