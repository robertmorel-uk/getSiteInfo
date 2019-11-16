const puppeteer = require('puppeteer');

//Execute script using node getScripts.js {site url} {filetype}
//EG: node getScripts.js https://imgur.com css

const url = process.argv[2];
const filetype = process.argv[3];
console.log(`Searching: ${url}`);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Emitted when the page produces a request
  console.group(`The following ${filetype} files were requested:`);
  page.on('request', request => {
      let requestUrl = request.url();
      if( requestUrl.includes( filetype )){
         console.info(`Request: ${request.url()}`);
      }
  });
  console.groupEnd();

  // Emitted after the page is closed
  page.once('close', () => console.info('Page is closed'));

  await page.goto(url);
  
  await browser.close();
})();