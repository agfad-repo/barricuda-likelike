const { time } = require('console');
const fs = require('fs');
const path = require('path');
const { start } = require('repl');
const mailer = require('./mailer');

const generateJson = function(fileUrl, callback) {
    fs.readFile(fileUrl, function(err, buf) {
        let visitors = {};
        let poolNames = [];
        let poolCounter = {};
        let counter = 0;
        if (buf === undefined) {
            console.log('ERROR');
            console.log(fileUrl);
        }
        console.silentLog('start json generation');
        const buffer = buf.toString().split('\n');
        for (let i = 0; i < buffer.length; i++) {
            const line = buffer[i];
            const cmd = line.split(',')[2] || line.split(',')[1];
            if (cmd === "serverStart" || cmd === undefined) {
                continue;
            }
            const timestamp = line.split(',')[0];
            const usr = line.split(',')[1];
            switch (cmd) {
                case "join":
                    if (usr && !visitors[usr]) visitors[usr] = {};
                    visitors[usr].join = timestamp;
                    visitors[usr].name = line.split(',')[3];
                    break;
                case "profile":
                    if (usr && !visitors[usr]) visitors[usr] = {};
                    visitors[usr].profile = line.split('profile')[1];
                    break;
                case "poolAnswers":
                    if (usr && !visitors[usr]) visitors[usr] = {};
                    let data = line.split('poolAnswers,')[1].split(',');
                    // remove first element (user ID)
                    data.shift();
                    let poolName = data.splice(0, 1);
                    if (!poolCounter[poolName]) {
                        poolCounter[poolName] = 0;
                    }
                    poolNames.push(poolName);
                    visitors[usr][poolName] = data;
                    poolCounter[poolName]++;
                    counter++;
                    break;
                default:
                    break;
            }

        }

        console.log('visitors: ' + Object.keys(visitors).length);
        console.log('total pools: ' + counter);

        for (let i = 0; i < Object.keys(poolCounter).length; i++) {
            const poolName = Object.keys(poolCounter)[i];
            const poolCount = poolCounter[poolName];
            console.log(poolName + ' answered: ' + poolCount);    
        }
        let jsonUrl =fileUrl.split('.csv')[0] + '.json';
        fs.writeFileSync(jsonUrl, JSON.stringify(visitors));
        
        let jsonFilename = jsonUrl.split('/')[fileUrl.split('/').length - 1];
        if (callback) callback(jsonFilename, jsonUrl);
    });
};


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
        let logFileName = './logs/' + startTime + '.csv';
        this.appendToLog(logFileName, startTime + ',serverStart');
        return logFileName;
    },
    changeLogFileName: function (time) {
        time = this.timeToLocale(new Date(time));
        time = this.timeToFileName(new Date(time));
        let logFileName = './logs/' + time + '.csv';
        return logFileName;
    },
    generateLog: function (files, logDir, exportPath, archivePath, callback) {
        // concatenate files
        let f0 = files[0].split('.csv')[0];
        if (f0.includes('_to_')) {
            f0 = f0.split('_to_')[0];
        }
        let f1 = files[files.length - 1].split('.csv')[0];
        if (f1.includes('_to_')) {
            f1 = f1.split('_to_')[1];
        }
        let rangeString = f0 + '_to_' + f1;
        let rangeLogFilename = path.join(exportPath, rangeString + '.csv');

        fs.stat(rangeLogFilename, function(err, stat) {
            if(err == null) {
                fs.unlink(rangeLogFilename, (error) => {
                    if (error) throw error;
                })
            }
        });

        for (let index = 0; index < files.length; index++) {
            let filename = files[index];
            let filePath = path.join(logDir, filename);

            try {
                const buf = fs.readFileSync(filePath)
                fs.appendFileSync(rangeLogFilename, buf.toString())
                fs.renameSync(filePath, path.join(archivePath, filename))
                console.silentLog('collect and archive ' + filename);
            } catch (e) {
                throw new Error('something failed appending logs')
            }
        }

        if (callback) {
            callback(rangeLogFilename);
        }
        return rangeLogFilename;
    },
    sendFileByMail: function (fileUrl, msg) {
        let fileName = fileUrl.split('/')[fileUrl.split('/').length - 1];
        let subject = "📊📋 " + msg + " 🕰️📬 " + fileName;
        let content = "Automatic traffic report. Do not reply.";
        mailer.sendMail(subject, content, fileName, fileUrl);
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
    getFilesFromPath: function (dirPath, extension, callback) {
        fs.readdir(dirPath, function (err, files) {
            let selectedFiles = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.split('.')[1] === extension) {
                    selectedFiles.push(file);
                }
            }
            callback(selectedFiles);
        });
    },
    getUnstoredDailyLogsFromPath: function (dirPath, callback) {
        let dateCollection = [];
        fs.readdir(dirPath, function (err, files) {
            for (let index = 0; index < files.length; index++) {
                let file = files[index];
                if (file.split('.')[1] === 'csv' && file.split('T').length === 1) {
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
                let filename = files[i].split('.csv')[0];
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
                let filename = generateLog(days, archiveDir, path.join(__dirname, '../logs/weeks'), path.join(__dirname, '../logs/archive'), function(filename) {
                    let jsonUrl = generateJson(filename);
                });
            }
        });
    },
    collectWeekLogs: function(folder) {
        let archiveDir = path.join(__dirname, folder);
        let generateLog = this.generateLog;
        let sendFileByMail = this.sendFileByMail;
        let today = this.timeToFileName(new Date());
        this.getUnstoredDailyLogsFromPath(archiveDir, function(files) {
            // exclude today file if it exist.
            let collectableFiles = [];
            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                if (element.split('.csv')[0] !== today) {
                    collectableFiles.push(element);
                }
            }
            if (collectableFiles.length > 1) {
                let filename = generateLog(collectableFiles, archiveDir,  path.join(__dirname, '../logs/weeks'), path.join(__dirname, '../logs/archive'), function(filename) {
                    let jsonUrl = generateJson(filename, function(jsonFilename, jsonUrl){
                        sendFileByMail(jsonUrl, "week Log");
                    });
                });
            } else {
                console.silentLog('collect Week: no files to collect');
            }
        });
    },
    sendLastWeekLog: function() {
        let archiveDir = path.join(__dirname, "../logs/weeks");
        let sendFileByMail = this.sendFileByMail;

        //get last file in weeks archive
        this.getFilesFromPath(archiveDir, 'csv', function(files) {
            let archiveDir = path.join(__dirname, "../logs/weeks");
            let fileUrl = path.join(archiveDir, files.sort().reverse()[0]);
            let jsonUrl = generateJson(fileUrl, function(jsonFilename, jsonUrl){
                sendFileByMail(jsonUrl, "last week report");
            });
        });
    },
    collectGlobalLogs: function(folder) {
        let archiveDir = path.join(__dirname, folder);
        let generateLog = this.generateLog;
        let sendFileByMail = this.sendFileByMail;
        this.getFilesFromPath(archiveDir, 'csv', function(files) {
            console.log(files);

            let filename = generateLog(files, archiveDir,  path.join(__dirname, '../logs/global'), path.join(__dirname, '../logs/weeks'), function(filename) {
                let jsonUrl = generateJson(filename, function(jsonFilename, jsonUrl){
                    sendFileByMail(jsonUrl, "global Log");
                    let globalPath = path.join(__dirname, '../public/logs/global.json');
                    fs.copyFile(jsonUrl, globalPath, function() {
                        console.silentLog('moving json to public global');
                    });
                });
                // copy latest global report to public folder
                fs.copyFile(filename, path.join(archiveDir, '../../public/logs/global.csv'), function() {
                    console.silentLog('moving global');
                });
            });
            return files;
        });
    }
};