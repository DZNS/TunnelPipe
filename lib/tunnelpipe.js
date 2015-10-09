#!/usr/bin/env node
'use strict';

const _UNKNOWN_ERR = -1;
const _NO_TUNNEL   = 1000;
const _NO_PIPES    = 1001;
const _NO_PIPE     = 1002; //when the specified pipe wasn't found.

const ROOT_FOLDER = ".tunnel";
const ROOT_FILE = "Tunnel";

let colors = require('colors')
let fs = require('./fspromise')

let knownHoles = require('./holes');

class TunnelPipe {

    constructor() {
        this.package = require("../package")
        this.program = require('commander')

        this.knownArgs = ["init"]

        this.pwd = process.env.PWD
        this.temp = process.env.TMPDIR

        this.init()
    }

    init() {

        var self = this
        
        self.program
            .version(self.package.version)
            //.option('-f, --foo', 'enable some foo')

        self.program
            .arguments('<cmd> [env]')
            .action(function (cmd, env) {

                if(cmd === "init") {
                    self.cmdInit(cmd, env)
                    return;
                }

                self.cmd = cmd
                self.env = env
            })

        self.program.on('--help', function() {

            console.log(`TunnelPipe v${self.package.version}`)
            console.log('Examples:')
            console.log('')
            console.log('  $ tunnelpipe dev')
            console.log('  $ tunnelpipe staging')
            console.log('  $ tunnelpipe production')
            console.log('  $ tunnelpipe custompipe')
            console.log('')
            console.log('  $ tunnelpipe --help')
            console.log('  $ tunnelpipe -h')
            console.log('')

        });

    }

    parse(argv) {

        var self = this

        self.program.parse(argv)

        self.process()

    }

    process() {

        var self = this;

        if(self.knownArgs.indexOf(self.cmd) > -1 || self.cmd === undefined)
            return;

        console.log(`Running ${self.cmd} pipe `.green, self.env ? "" : "(No extra parameters defined)")

        fs
            .access(`${self.pwd}/${ROOT_FOLDER}`, fs.F_OK | fs.R_OK)
            .then(() => {

                var pipe = require([self.pwd, ROOT_FOLDER, `${self.cmd}`].join('/'))

                self.cmdPipe(pipe);

            })
            .catch((err) => {

                if(err.message.indexOf("no such file or directory") > -1 && 
                    /\.tunnel\'$/gi.test(err.message)) {

                    console.error("A tunnel folder wasn't found in the current directory. Run tunnelpipe init to create one.".red)

                    return;

                }

                if(err.message.indexOf("Cannot find module") > -1 && 
                    /\.tunnel\/(\w+)\'$/gi.test(err.message)) {

                    console.error(`⚠️  The pipe ${self.cmd} could not found.`.red, 
                        "\n⚠️  Please check that is exists and the name as well.")

                    return;

                }

                console.error(err.message.red)

            })

    }

    //various commands
    cmdInit(cmd, args) {

        var self = this;

        fs
            .access([self.pwd, ROOT_FOLDER].join("/"))
            .then(() => {
                console.log("A tunnel folder already exists. Not proceeding further.")
            })
            .catch((err) => {

                fs
                    .mkdir([self.pwd, ROOT_FOLDER].join("/"))
                    .then(() => { 
                        return fs.write([self.pwd, ROOT_FOLDER, ROOT_FILE].join("/"), "") 
                    })
                    .then(() => {
                        console.log("🎉 " + " Your new tunnel has been created.".green)
                    })
                    .catch((err) => {

                        console.error(err.message.red)

                    })

            })

    }

    cmdPipe(pipe) {

        var self = this;

        // console.log("Commands to run : ", pipe.join(","))
        
        if(!pipe.length) {
            //we're already done. Let's call it A-OK.
            console.log(`🎉  The pipe ${self.cmd.bold} ran successfully with no errors.`.green)
            return;
        }

        pipe.reduce(function(cur, next, idx) {

            var fetchIndex = ((hole) => {

                if(hole.constructor === String) {
                    //do lookup
                    return knownHoles[hole]

                }

                if(hole.constructor === Object) {
                    //do lookup
                    return knownHoles[hole.name]

                }

            })
            
            var holeA = fetchIndex(cur)
            var holeB = fetchIndex(next)

            console.log(holeA, holeB)

            //both are known. connect them
            if(holeA !== undefined && holeB !== undefined) {

                //here onwards, inside this scope, we assume both are subclasses of the Hole Class.
                var args = cur.constructor === Object && cur.args !== undefined ? cur.args : undefined;
                args = [self.pwd].concat(args || []);

                return holeA
                    .process
                    .apply(null, args)
                    .then(() => {
                        return holeB
                    })

            }

            if(holeA) {

                var args = cur.constructor === Object && cur.args !== undefined ? cur.args : undefined;
                args = [self.pwd].concat(args || []);

                return holeA
                    .process
                    .apply(null, args)

            }

            if(holeB) {

                var args = next.constructor === Object && next.args !== undefined ? cur.args : undefined;
                args = [self.pwd].concat(args || []);

                return holeB
                    .process
                    .apply(null, args)

            }

        }, pipe.shift())
        .then(function() {
            //all executed
            console.log(`🎉  The pipe ${self.cmd.bold} ran successfully with no errors.`.green)
        })
        .catch((err) => {

            console.error(`An error occurred when running through the ${self.cmd.bold} pipe`.red)
            console.error(err.stack.red)

        })

    }

}

module.exports = new TunnelPipe()