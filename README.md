# exec-with-verify
asynchronously exec child processes and verify that a string is printed to stdout

Expects a configuration that includes a cmd to execute, the working directory, and an optional verification string.

execWithVerify returns a promise that will resolve/reject upon process completion.  

Installation: 
    npm install exec-with-verify

Example config: 

    var config = { cmd: 'ng build --prod', cwd: 'src/main/js/myapp', successString: 'Built project successfully'};

    var execV = require('exec-with-verify');
    execV.execWithVerify(config);

The config may be a single config object or an array.  If it's an array, the child processes will be executed concurrently.    

Gulp Example: task that builds a group of angular 2 apps with angular-cli

    var apps = [ 'src/main/js/myapp1', 'src/main/js/myapp2' ];

    gulp.task('ng:build', function() {

        var execV = require('exec-with-verify');

        var configs = apps.map(function(app) {
                return { cmd: 'ng build --prod', cwd: app, successString: 'Built project successfully'};
            });

        return execV.execWithVerify(configs);
    });
    