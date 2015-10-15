'use strict';

var util = require('util')
var exec = require('child_process').exec;

class Bash {

    constructor() {

        this.args = [].slice.call(arguments)

    }

    init(cmd, args) {

        var self = this
        
        return new Promise((resolve, reject) => {

            self.process = exec(self.args.join(" "), function (error, stdout, stderr) {

                if (error)
                    reject(error)
                else 
                    resolve(stdout)

            })

        })

    }

}

module.exports = Bash;