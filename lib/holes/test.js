"use strict"

let Hole = require("./hole");
let shell = require("../helpers").shell;

module.exports = class test extends Hole {

    static get name() {
        return "test"
    }

    static get description() {
        return "runs the default test via npm run test."
    }

    static process() {

        var cmd = new shell(`npm run test`)

        return cmd
        .init()
        .then((result) => {

            if(result) {
                console.log(result)
                return true
            }

            console.error("---")
            throw new Error(`failed to add the tag : ${tag}`)

        })

    }

}
