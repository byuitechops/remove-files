/* Deletes all created files that aren't to be used by the user. */

/* Put dependencies here */
const rimraf = require('rimraf');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

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
                var folderName = `${folder.split('\\')[folder.split('\\').length - 2]}\\${folder.split('\\')[folder.split('\\').length - 1]}`;
                course.message(`${folderName} successfully removed`);
            }
            callback();
        });
    }

    var foldersToRemove = [
        // course.info.originalZipPath,
        course.info.unzippedPath,
        course.info.processedPath,
        course.info.uploadZipPath
    ];
        
    asyncLib.eachSeries(foldersToRemove, deleteFolder, () => {
        stepCallback(null, course);
    });
};