
/**
*   input format: [ { cmd: 'npm build', cwd: '.', successString: 'BUILD SUCCESS'} ]
*/

exports.execWithVerify = function(args) {

	var configs = _argsAsConfigArray(args);

	return Promise.all(configs.map(function(config) {
		return _execWithVerify(config.cmd, config.cwd, config.successString );
	}));	

	function _execWithVerify(cmd, cwd, successString) {

	    return new Promise(function(resolve, reject) {

	        console.log("cwd: " + cwd);
	        console.log("exec: " + cmd);

	        var _exec = require('child_process').exec;
	        _exec(cmd,{cwd: cwd}, function(err, stout, sterr) {

	            console.log(stout);
	            console.log(sterr);

	            if ( successString && stout.indexOf(successString) === -1 ) {
					reject('EXECUTION FAILED');
	                return;
	            }

	            if(err)  {
	                reject(err);
	                return
	            }

	            console.log("exec complete: " + cmd);

	            resolve();
	        }); // _exec

	    }); // promise

	} // _execWithVerify

	function _argsAsConfigArray(_args) {

		if( Object.prototype.toString.call( _args ) === '[object Array]' ) {
		    return _args;
		} else {
			return [ _args ];
		}

	}


};

exports.execSync = function(cmd, cwd) {

    var _exec = require('child_process').execSync;
    var buffer = _exec( cmd, {cwd: cwd});

    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf-8');
    console.log(decoder.write(buffer));

    return true;
}


