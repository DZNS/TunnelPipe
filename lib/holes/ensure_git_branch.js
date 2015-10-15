"use strict"

let Hole = require("./hole");
let shell = require("../helpers").shell;

module.exports = class ensure_git_branch extends Hole {

    static get name() {
        return "ensure_git_branch"
    }

    static get description() {
        return "Check if the current branch is the intended one. If not, the hole will return an error and the pipe will not continue to flow."
    }

    static process() {

        var args = [].slice.call(arguments)

        // first system arg. Here onwards, all args are user provided.
        var pwd = args.shift()

        // first argument should always be the input file
        var branchName = args.shift()

        var cmd = new shell("git reflog HEAD | grep 'checkout:' | head -1 | rev | cut -d' ' -f1 | rev")

        return cmd
        .init()
        .then((result) => {

            //extra \n is present sometimes. Clean that up.
            result = result.trim()

            if (result && result.length && result === branchName) {
                return true
            }

            throw new Error(`git is not on branch ${branchName}. Stopping flow through pipe`)

        })

    }

}
