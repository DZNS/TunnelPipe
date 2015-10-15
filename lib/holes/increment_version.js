"use strict"

let Hole = require("./hole");
var fs = require("../fspromise");

module.exports = class increment_version extends Hole {

    static get name() {
        return "increment_version"
    }

    static get description() {
        return "Increment the version of your project inside the package.json file if one is found. This can be used in conjunction with the add_git_tag hole to add a tag of the same semver."
    }

    static get TYPE_MAJOR() {
        return "A"
    }

    static get TYPE_MINOR() {
        return "B"
    }

    static get TYPE_PATCH() {
        return "C"
    }

    static process(pwd, type) {

        var path = [pwd, "package.json"].join("/")

        return fs
            .access(path)
            .then(() => {

                var pjson = require(path)

                if(!pjson) {
                    throw new Error("A package.json file wasn't found in the current directory.")
                    return false
                }

                return pjson

            })
            .then((pjson) => {

                var ver = pjson.version.split(".")
                ver = ver.map((x) => {
                    return parseInt(x)
                })

                if(type == "A") {

                    ver[0] = ver[0] + 1
                    ver[1] = 0
                    ver[2] = 0

                }
                else if(type == "B") {

                    ver[0] = ver[0]
                    ver[1] = ver[1] + 1
                    ver[2] = 0

                }
                else if(type == "C") {

                    ver[0] = ver[0]
                    ver[1] = ver[1]
                    ver[2] = ver[2] + 1

                }
                else {
                    throw new Error(`An unknown type format was specified to ${increment_version.name}`)
                }

                pjson.version = ver.join(".");

                fs.write([pwd, "package.json"].join("/"), JSON.stringify(pjson, null, 2))

            })

    }

}