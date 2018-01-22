/*eslint-env node, es6*/

/* Deletes all created files that aren't to be used by the user.
In debug mode, the files are not deleted. */

/* Put dependencies here */
const rimraf = require('rimraf');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

    /* If not wanting to keep files */
    if (!course.settings.keepFiles) {

        asyncLib.waterfall([
            (callback) => {
                rimraf(course.info.originalFilepath, err => {
                    if (err) {
                        course.error(err);
                    } else {
                        course.message('Original course zip was successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.unzippedFilepath, err => {
                    if (err) {
                        course.error(err);
                    } else {
                        course.message('Unzipped original course was successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.altUnzippedFilepath, err => {
                    if (err) {
                        course.error(err);
                    } else {
                        course.message('Unzipped altered course successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.zippedFilepath, err => {
                    if (err) {
                        course.error(err);
                    } else {
                        course.message('Generated zip successfully removed');
                    }
                    callback();
                });
            }
        ], () => {
            stepCallback(null, course);
        });
    } else {
        stepCallback(null, course);
    }
};
