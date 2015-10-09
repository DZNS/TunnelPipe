"use strict"

let fs = require('fs')

class FSP {

    get F_OK() {
        return fs.F_OK;
    }

    get R_OK() {
        return fs.R_OK;
    }

    get W_OK() {
        return fs.W_OK;
    }

    get X_OK() {
        return fs.X_OK;
    }

    static access(path, mode) {

        var promise = new Promise((resolve, reject) => {

            fs.access(path, mode, function (err) {
            
                if(err) {
                    reject(err);
                    return;
                }

                resolve();

            })

        });

        return promise;

    }

    static mkdir(path, mode) {

        var promise = new Promise((resolve, reject) => {

            fs.mkdir(path, mode, function (err) {
            
                if(err) {
                    reject(err);
                    return;
                }

                resolve();

            })

        });

        return promise;

    }

    static write(filepath, data) {

        var promise = new Promise((resolve, reject) => {

            fs.open(filepath, 'w', (err, fd) => {

                if(err) {
                    reject(err);
                    return;
                }

                fs.write(fd, data, function (err) {
            
                    if(err) {
                        reject(err);
                        return;
                    }

                    fs.closeSync(fd);

                    resolve();

                })

            });

        });

        return promise;

    }

}

module.exports = FSP;