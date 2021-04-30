const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    let chromePath;

    switch(process.platform){
        case 'win32':
            chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            break;
        case 'darwin':
            chromePath = '/Applications/Google Chrome.app'
            break;
        case 'linux':
            const process = require('child_process');
            const command = 'whereis google-chrome-stable'
            var cmd = process.spawn(command);

            cmd.stdout.on('data', function(output){
                chromePath = output.toString();
            });

            cmd.on('close', function(){
                console.log('Finished');
            });

            //Error handling
            cmd.stderr.on('data', function(err){
                console.log(err);
            });
            break;
    }

    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: chromePath,
            userDataDir: './cache',
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};