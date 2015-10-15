"use strict"

let Hole = require("./hole");
let shell = require("../helpers").shell;

module.exports = class gz {

	static get name() {
        return "gz"
    }

    static get description() {
        return "Create a gzipped version of a file. Typically used with front-end static assets like css and javascript files."
    }

    static process() {

    	var args = [].slice.call(arguments)

    	// first system arg. Here onwards, all args are user provided.
    	var pwd = args.shift()

    	// first argument should always be the input file
    	var input = args.shift()

    	// second argument is the compression level.
    	var compression = args.shift()

    	// last argument is optional, if provided, the output should be piped to that instead.
    	var output = args.shift()
    	
    	var cmd = new shell("gzip", `-${compression}`, '-f', `${pwd}/${input}`)

    	return cmd
    	.init()
    	.then((result) => {

    		// also means no errors occcurred
    		if(!result || !result.length) {
    			return input+'.gz'
    		}

    	})

    }

}
