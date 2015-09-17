// This file in the main entry point for defining grunt tasks and using grunt plugins.

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        csscomb: {
            options: {
                config: 'bower_components/bootstrap/less/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/'
            }
        },

        less: {
            bootstrap: {
                options: {
                    strictMath:true,
                   // paths:["assets","bower_components/bootstrap/less"]
                    paths:["bower_components/bootstrap/less"]
                },

                src:'assets/bootstrap.less',
                dest:'css/bootstrap.css'
            },
            bootstrap_theme: {
                options: {
                    strictMath:true,
                    // paths:["assets","bower_components/bootstrap/less"]
                    paths:["bower_components/bootstrap/less"]
                },

                src:'bower_components/bootstrap/less/theme.less',
                dest:'css/bootstrap-theme.css'
            }           
        }
    });

    grunt.registerTask("less-compile", ["less:bootstrap","less:bootstrap_theme");
    grunt.registerTask("prepcss",['csscomb:dist','less-compile']);
    grunt.loadNpmTasks("grunt-csscomb");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask('default','watch');

};