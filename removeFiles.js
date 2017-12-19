/*eslint-env node, es6*/

/* Deletes all created files that aren't to be used by the user.
In debug mode, the files are not deleted. */

/* Put dependencies here */
const rimraf = require('rimraf');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {
    /* Add module report */
    course.addModuleReport('remove-files');

    /* If not wanting to keep files */
    if (!course.settings.keepFiles) {

        asyncLib.waterfall([
            (callback) => {
                rimraf(course.info.originalFilepath, err => {
                    if (err) {
                        course.throwErr('remove-files', err);
                    } else {
                        course.success('remove-files', 'Original course zip successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.unzippedFilepath, err => {
                    if (err) {
                        course.throwErr('remove-files', err);
                    } else {
                        course.success('remove-files', 'Unzipped original course successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.altUnzippedFilepath, err => {
                    if (err) {
                        course.throwErr('remove-files', err);
                    } else {
                        course.success('remove-files', 'Unzipped altered course successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.zippedFilepath, err => {
                    if (err) {
                        course.throwErr('remove-files', err);
                    } else {
                        course.success('remove-files', 'Generated zip successfully removed');
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
