"use strict"

let Hole = require("./hole");
let shell = require("../helpers").shell;

module.exports = class add_tag extends Hole {

    static get name() {
        return "add_tag"
    }

    static get description() {
        return "adds a git tag to the HEAD of the current branch."
    }

    static process() {

        var args = [].slice.call(arguments)

        // first system arg. Here onwards, all args are user provided.
        var pwd = args.shift()

        // first argument should always be the input file
        var tag = args.shift()

        var cmd = new shell(`git tag -am '${tag} (tunnelpipe)' '${tag}'`)

        return cmd
        .init()
        .then((result) => {

            //extra \n is present sometimes. Clean that up.
            result = result.trim()

            if (!result.length) {
                return true
            }

            console.error("---")
            throw new Error(`Failed to run the tests`)

        })

    }

}
