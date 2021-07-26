const fs = require('fs');
const path = require('path');
const { start } = require('repl');
const mailer = require('./mailer');

module.exports = {
    timeToFileName: function (time) {
        return time.toISOString().split('.')[0];
    },
    timeToLocale: function(time) {
        if (!time) {
            time = new Date(Date.now());
        }
        let localeTime = new Date(time.getTime() - (time.getTimezoneOffset() * 60000));
        return localeTime;
    },
    writeToFile: function (file, data) {
        fs.writeFile(file, data, 'utf8', (err) => {
            if (err) return console.silentLog(`Error writing file ` + file + ` : ${err}`);
            console.silentLog(`File ` + file + ` is written successfully!`);
        });
    },
    // data is an array with all data
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
        let logFileName = './logs/' + startTime + '.txt';
        this.writeToFile(logFileName, startTime + ',serverStart\n');
        return logFileName;
    },
    changeLogFileName: function (time) {
        time = this.timeToLocale(new Date(time));
        time = this.timeToFileName(new Date(time));
        let logFileName = './logs/' + time + '.txt';
        // this.writeToFile(logFileName, time + ',new log file\n');
        return logFileName;
    },
    generateDailyLog: function () {
        let date = new Date();
        var yesterday = new Date(date.getTime());
        yesterday.setDate(date.getDate() - 1);

        let yesterdayString = yesterday.toISOString().split('T')[0];
        let logDir = path.join(__dirname, '../logs');
        let archiveDir = path.join(__dirname, '../logs/archive');

        // fake date for testing purposes
        // yesterdayString = '2021-06-24';
        let dailyLog = path.join(logDir, yesterdayString + '.txt');

        let appendFile = fs.appendFile;
        fs.readdir(logDir, function (err, files) {
            let fileCount = 0;
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                if (file !== yesterdayString && file.split('T')[0] === yesterdayString) {
                    fileCount++;
                    let filePath = path.join(logDir, file);
                    fs.readFile(filePath, function(err, buf) {
                        appendFile(dailyLog, buf.toString(), function() {
                            fs.rename(filePath, path.join(archiveDir, file), function() {
                                console.silentLog(`File ` + yesterdayString + `.txt is updated successfully!`);
                                console.silentLog('moving log ' + file + ' to archive folder');
                            });
                        });
                    });
                }
            }
            if (fileCount > 0) {
                console.silentLog('--> daily log ' + yesterdayString + '.txt generated');
            } else {
                console.silentLog('--> skip daily generation');
            }
        });

        return yesterdayString;
    },
    getPreviousWeekArray: function () {
        let currentDate = new Date();
        var yesterday = new Date(currentDate.getTime());
        yesterday.setDate(currentDate.getDate() - 1);

        var weekDates = [];
        for (let index = 7; index > 0; index--) {
            let date = new Date(currentDate.getTime());
            date.setDate(currentDate.getDate() - index)
            weekDates.push(date.toISOString().split('T')[0]);
        }

        return weekDates;
    },
    getPreviousWeekFileName: function (weekDates) {
        return weekDates[0] + '_to_' + weekDates[6];
    },
    generateWeeklyLog: function () {
        // this runs every monday and look for dailys from previous monday (7 days ago) 
        // to previous sunday (yesterday)
        let weekDates = this.getPreviousWeekArray();
        let weeklyString = this.getPreviousWeekFileName(weekDates);
        console.silentLog('generating weekly log' + weeklyString);
        console.silentLog('previous week', weekDates);
        console.silentLog('week file ', weeklyString);

        let logDir = path.join(__dirname, '../logs');
        let archiveDir = path.join(__dirname, '../logs/archiveDaily');
        let weeklyLog = path.join(logDir, weeklyString + '.txt');

        let appendFile = fs.appendFile;
        fs.readdir(logDir, function(err, files) {
            let fileCount = 0;
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                if (weekDates.includes(file.split('.')[0])) {
                    console.silentLog('incluido ' + file);
                    fileCount++;
                    let filePath = path.join(logDir, file);
                    fs.readFile(filePath, function(err, buf) {
                        appendFile(weeklyLog, buf.toString(), function() {
                            fs.rename(filePath, path.join(archiveDir, file), function() {
                                console.silentLog(`File ` + weeklyString + `.txt is updated successfully!`);
                                console.silentLog('moving daily ' + file + ' to archive folder');
                            });
                        });
                    })
                }
            }
        });

        return weeklyString;
    },
    sendWeeklyLog: function () {
        let weekDates = this.getPreviousWeekArray();
        let weeklyString = this.getPreviousWeekFileName(weekDates);
        let logDir = path.join(__dirname, '../logs');
        let archiveDir = path.join(__dirname, '../logs/archiveWeekly');
        let weeklyLog = path.join(logDir, weeklyString + '.txt');

        console.silentLog('sending file ' + weeklyString);
        
        let subject = "📊📋 Log likelike Test ✔ 🕰️📬 " + weeklyString;
        let content = "Automatic traffic report. Do not reply.";
        mailer.sendMail(subject, content, weeklyString + '.txt', weeklyLog, function() {
            fs.rename(weeklyLog, path.join(archiveDir, weeklyString + '.txt'), function() {
                console.silentLog('moving weekly ' + weeklyString + ' to archive folder');
            })
        });
    }
};