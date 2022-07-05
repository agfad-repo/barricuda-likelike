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
        
        //let jsonFilename = jsonUrl.split('/')[fileUrl.split('/').length - 1];
        if (callback) callback(jsonUrl);
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
    generateDailyLog: function (files, logDir, exportPath, archivePath, callback) {
        let outputFilename = path.join(exportPath, 'global.csv');

        for (let index = 0; index < files.length; index++) {
            let filename = files[index];
            let filePath = path.join(logDir, filename);

            try {
                const buf = fs.readFileSync(filePath)
                fs.appendFileSync(outputFilename, buf.toString())
                fs.renameSync(filePath, path.join(archivePath, filename))
            } catch (e) {
                throw new Error('something failed appending logs')
            }
        }

        if (callback) {
            callback(outputFilename);
        }
        return outputFilename;
    },
    sendFileByMail: function (fileUrl, msg) {
        let fileName = fileUrl.split('/')[fileUrl.split('/').length - 1];
        let subject = "📊📋 " + msg + " 🕰️📬 " + fileName;
        let content = "Automatic traffic report. Do not reply.";
        mailer.sendMail(subject, content, fileName, fileUrl);
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
    collectDailyGlobalLogs: function(folder, callback) {
        let sourceDir = path.join(__dirname, folder);
        let archiveDir = path.join(__dirname, '../logs/archive');
        let globalDir = path.join(__dirname, '../logs/global');

        let generateDailyLog = this.generateDailyLog;
        let sendFileByMail = this.sendFileByMail;
        this.getFilesFromPath(sourceDir, 'csv', function(files) {
            //             generateDailyLog(files, logDir,   exportPath, archivePath, callback)
            let filename = generateDailyLog(files, sourceDir,  globalDir, archiveDir, function(filename) {
                let jsonUrl = generateJson(filename, function(jsonUrl){
                    // copy latest global JSON report to public folder
                    fs.copyFile(jsonUrl, path.join(__dirname, '../public/logs/global.json'), function() {
                        // send report by email
                        if (process.env.SENDLOG.toLowerCase() === 'true') {
                            sendFileByMail(jsonUrl, "global Log");
                        };
                    });
                     // copy latest global CSV report to public folder
                    fs.copyFile(filename, path.join(__dirname, '../public/logs/global.csv'), function() {});
                });
               
            });

            if (callback) callback(filename);
            return files;
        });
    },
};
