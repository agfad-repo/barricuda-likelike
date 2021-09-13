const fs = require('fs');
const path = require('path');
const { start } = require('repl');
const mailer = require('./mailer');

module.exports = {
    createDirectory: function(dirName) {
        let homedir =path.join(__dirname, '..');
        fs.mkdir(path.join(homedir, dirName), function() {});
    },
    timeToFileName: function (time) {
        return time.toISOString().split('.')[0].split('T')[0];
    },
    fileNameToTime: function (filename) {
        // return time.toISOString().split('.')[0].split('T')[0];
        let y = filename.split('-')[0];
        let m = filename.split('-')[1]-1;
        let d = filename.split('-')[2];
        return new Date(y, m, d);
    },
    timeToLocale: function(time) {
        if (!time) {
            time = new Date(Date.now());
        }
        let localeTime = new Date(time.getTime() - (time.getTimezoneOffset() * 60000));
        return localeTime;
    },
    appendToLog: function (file, id, action, data) {
        let time = this.timeToLocale();
        let timeString = time.toISOString();
        let content = [timeString, id, action].join(',');
        if (data) {
            content = [content, data.join(',')].join(',');
        }
        content += '\n';
        fs.appendFile(file, content, (err) => {
            if (err) return console.silentLog(`Error appending to file ` + file + ` : ${err}`);
            console.silentLog(`File ` + file + ` is updated successfully!`);
        })
    },
    serverStart: function (startTime) {
        startTime = this.timeToLocale(new Date(startTime))
        startTime = this.timeToFileName(new Date(startTime));
        this.createDirectory('logs');
        this.createDirectory('logs/archive');
        this.createDirectory('logs/weeks');
        this.createDirectory('logs/global');
        this.createDirectory('public/logs');
        let logFileName = './logs/' + startTime + '.txt';
        this.appendToLog(logFileName, startTime + ',serverStart');
        return logFileName;
    },
    changeLogFileName: function (time) {
        time = this.timeToLocale(new Date(time));
        time = this.timeToFileName(new Date(time));
        let logFileName = './logs/' + time + '.txt';
        return logFileName;
    },
    generateLog: function (files, logDir, exportPath, archivePath) {
        // concatenate files
        let f0 = files[0].split('.txt')[0];
        if (f0.includes('_to_')) {
            f0 = f0.split('_to_')[0];
        }
        let f1 = files[files.length - 1].split('.txt')[0];
        if (f1.includes('_to_')) {
            f1 = f1.split('_to_')[1];
        }
        let rangeString = f0 + '_to_' + f1;
        let rangeLogFilename = path.join(exportPath, rangeString + '.txt');

        for (let index = 0; index < files.length; index++) {
            let filename = files[index];
            console.silentLog('included and archived ' + filename);
            let filePath = path.join(logDir, filename);
            fs.readFile(filePath, function(err, buf) {
                fs.appendFile(rangeLogFilename, buf.toString(), function() {
                    fs.rename(filePath, path.join(archivePath, filename), function() {
                        console.silentLog('moving daily ' + filename + ' to ' + archivePath);
                    });
                });
            })
        }

        return rangeLogFilename;
    },
    sendFileByMail: function (fileUrl, msg) {
        let fileName = fileUrl.split('/')[fileUrl.split('/').length - 1];
        console.silentLog('sending file ' + fileName);
        let subject = "📊📋 " + msg + " 🕰️📬 " + fileName;
        let content = "Automatic traffic report. Do not reply.";
        mailer.sendMail(subject, content, fileName, fileUrl, function() {
            console.silentLog('sending weekly ' + fileName + ' to email');
        });
    },
    getWeekNumber: function(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    },
    getFilesFromPath: function (dirPath, callback) {
        fs.readdir(dirPath, function (err, files) {
            callback(files);
        });
    },
    getUnstoredDailyLogsFromPath: function (dirPath, callback) {
        let dateCollection = [];
        fs.readdir(dirPath, function (err, files) {
            for (let index = 0; index < files.length; index++) {
                let file = files[index];
                if (file.split('.')[1] === 'txt' && file.split('T').length === 1) {
                    let date = file.split('T')[0];
                    if (dateCollection.includes(date) === false) {
                        dateCollection.push(date);
                    }
                } 
            };
            callback(dateCollection);
        });
    },
    cleanUpLogs: function() {
        const archiveDir = path.join(__dirname, '../logs');
        // get all daily logs (except from current week) and generate weekly archives
        let getWeekNumber = this.getWeekNumber;
        let generateLog = this.generateLog;
        let fileNameToTime = this.fileNameToTime;
        let currentWeekNumber = getWeekNumber(new Date)[1];

        this.getUnstoredDailyLogsFromPath(archiveDir, function(files) {
            let week = null
            let collection = {};

            for (let i = 0; i < files.length; i++) {
                let filename = files[i].split('.txt')[0];
                let fileDate = new Date(filename);
                let fileWeek = getWeekNumber(fileDate);
                // exclude current week files
                if (fileWeek[1] !== currentWeekNumber) {
                    if (Array.isArray(collection['week' + fileWeek[1]])) {
                        collection['week' + fileWeek[1]].push(files[i]);
                    } else {
                        collection['week' + fileWeek[1]] = [];
                        collection['week' + fileWeek[1]].push(files[i]);
                    }
                }
            }

            for (let index = 0; index < Object.keys(collection).length; index++) {
                week = Object.keys(collection)[index];
                const days = collection[week];
                console.silentLog(week, days, 'generating range Log and moving files to archive');
                let filename = generateLog(days, archiveDir, path.join(__dirname, '../logs/weeks'), path.join(__dirname, '../logs/archive'));
            }
        });
    },
    collectWeekLogs: function(folder) {
        let archiveDir = path.join(__dirname, folder);
        let generateLog = this.generateLog;
        let sendFileByMail = this.sendFileByMail;
        this.getUnstoredDailyLogsFromPath(archiveDir, function(files) {
            let filename = generateLog(files, archiveDir,  path.join(__dirname, '../logs/weeks'), path.join(__dirname, '../logs/archive'));
            setTimeout(function() {
                sendFileByMail(filename, "week Log");
            }, 5000);
        });
    },
    sendLastWeekLog: function() {
        let archiveDir = path.join(__dirname, "../logs/weeks");
        let generateLog = this.generateLog;
        let sendFileByMail = this.sendFileByMail;

        //get last file
        this.getFilesFromPath(archiveDir, function(files) {
            let archiveDir = path.join(__dirname, "../logs/weeks");
            let fileUrl = path.join(archiveDir, files.sort().reverse()[0]);
            // console.log(fileUrl)
            sendFileByMail(fileUrl, "last week report");
        })
    },
    collectGlobalLogs: function(folder) {
        let archiveDir = path.join(__dirname, folder);
        let generateLog = this.generateLog;
        let sendFileByMail = this.sendFileByMail;
        this.getFilesFromPath(archiveDir, function(files) {
            console.log(files);
            let filename = generateLog(files, archiveDir,  path.join(__dirname, '../logs/global'), path.join(__dirname, '../logs/weeks'));
            setTimeout(function() {
                sendFileByMail(filename, "global Log");
                // copy latest global report to public folder
                fs.copyFile(filename, path.join(archiveDir, '../../public/logs/global.txt'), function() {
                    console.silentLog('moving global');
                });
            }, 5000);
            return files;
        });
    }
};