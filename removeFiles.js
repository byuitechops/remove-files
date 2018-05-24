/*eslint-env node, es6*/

/* Deletes all created files that aren't to be used by the user. */

/* Put dependencies here */
const rimraf = require('rimraf');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

    /*  function deleteOriginalZip(callback) {
        rimraf(course.info.originalZipPath, err => {
            if (err) {
                course.error(err);
            } else {
                course.message('Original course zip was successfully removed');
            }
            callback();
        });
    }

    function deleteUnzipped(callback) {
        rimraf(course.info.unzippedPath, err => {
            if (err) {
                course.error(err);
            } else {
                course.message('Unzipped original course was successfully removed');
            }
            callback();
        });
    }

    function deleteProcessed(callback) {
        rimraf(course.info.processedPath, err => {
            if (err) {
                course.error(err);
            } else {
                course.message('Unzipped altered course successfully removed');
            }
            callback();
        });
    }

    function deleteUploadZip(callback) {
        rimraf(course.info.uploadZipPath, err => {
            if (err) {
                course.error(err);
            } else {
                course.message('Generated zip successfully removed');
            }
            callback();
        });
    } */

    function deleteFolder(folder, callback) {
        if (folder == undefined || folder === 'Unspecified') {
            course.message(`Unable to delete ${folder}`);
            callback();
            return;
        }

        rimraf(folder, err => {
            if (err) {
                course.error(err);
            } else {
                course.message(`${folder.split('\\')[folder.split('\\').length - 1]}Directory successfully removed`);
            }
            callback();
        });
    }


    /* If not wanting to keep files */
    if (course.settings.keepFiles) {
        stepCallback(null, course);
    } else {
        var foldersToRemove = [
            course.info.originalZipPath,
            course.info.unzippedPath,
            course.info.processedPath,
            course.info.uploadZipPath
        ];
        
        asyncLib.eachSeries(foldersToRemove, deleteFolder, () => {
            stepCallback(null, course);
        });

        /* asyncLib.waterfall([
            //deleteOriginalZip,
            deleteProcessed,
            deleteUnzipped,
            deleteUploadZip
        ], () => {
            stepCallback(null, course);
        }); */
    }
};