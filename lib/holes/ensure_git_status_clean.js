"use strict"

let Hole = require("./hole");
let shell = require("../helpers").shell;

module.exports = class ensure_git_branch extends Hole {

    static get name() {
        return "ensure_git_status_clean"
    }

    static get description() {
        return "Helps you sleep well at night knownig that your CI/CD pipe was run on a clean git staging area."
    }

    static process() {

        var cmd = new shell("git status --porcelain")

        return cmd
        .init()
        .then((result) => {

            if (result && result.length) {
                console.error("---")
                throw new Error(`git staging area is not clean. Stopping flow through pipe`)
            }

            return true

        })

    }

}
