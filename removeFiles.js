/* Deletes all created files that aren't to be used by the user. */

/* Put dependencies here */
const rimraf = require('rimraf');
const asyncLib = require('async');
const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {

    function deleteTempFolder() {
        if (course.info.tempFile == undefined) {
            stepCallback(null, course);
            return;
        }
    
        /* get all files */
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/files`, (getErr, files) => {
            if (getErr) {
                course.error(getErr);
                stepCallback(null, course);
                return;
            }
            /* filter to the temp file created in course-has-content */
            var tempFile = files.find(file => file.display_name === course.info.tempFile);
    
            if (tempFile == undefined) {
                course.warning(`Unable to find Temp file with name: ${course.info.tempFile}`);
                stepCallback(null, course);
                return;
            }
    
            /* delete the file */
            canvas.delete(`/api/v1/files/${tempFile.id}`, (deleteErr) => {
                if (deleteErr) {
                    course.error(getErr);
                    stepCallback(null, course);
                    return;
                }
    
                /* all done */
                course.message(`deleted temp file: ${course.info.tempFile}`);
                stepCallback(null, course);
    
            });
        });
    }

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
        deleteTempFolder();
        // stepCallback(null, course);
    });
};
