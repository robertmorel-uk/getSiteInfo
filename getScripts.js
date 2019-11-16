const puppeteer = require('puppeteer');

//Execute script using node getScripts.js {site url} {fileNameSearchTerm}
//EG: node getScripts.js https://imgur.com css

function main(){
  const url = process.argv[2];
  const fileNameSearchTerm = process.argv[3];

  if (url == null ){
    console.log("Please enter a url as the first parameter. e.g. https://imgur.com");
    return;
  }

  if (fileNameSearchTerm == null ){
    console.log("Please enter a file Name Search Term as the 2nd parameter. e.g. css, js, bootstrap or jquery");
    return;
  }
  console.log(`Searching: ${url}`);

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Emitted when the page produces a request
    console.group(`Files containing the search term: ${fileNameSearchTerm} were requested:`);
    page.on('request', request => {
        let requestUrl = request.url();
        if( requestUrl.includes( fileNameSearchTerm ) && !requestUrl.includes("base64")){
          console.info(`Request: ${request.url()}`);
        }
    });
    console.groupEnd();

    // Emitted after the page is closed
    page.once('close', () => console.info('Page is closed'));

    await page.goto(url);
    
    await browser.close();
  })();
}

main();