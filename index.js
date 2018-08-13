const lighthouse = require('lighthouse-lambda');
const util = require('util');
const options = {
    onlyCategories: ['performance'],
    //logLevel: 'info',
    // chromeFlags: ['--headless', '--disable-gpu']
};

const urlBeingTested = 'https://gizmodo.com';

exports.handler = function (event, context, callback) {
  Promise.resolve()
    .then(() => lighthouse(urlBeingTested, options))
    .then(({ chrome, start }) => {
      return start()
        .then((results) => {
          // Do something with `results`
/*
            console.log('lhr:');
            console.log(Object.keys(results.lhr));

            console.log('artifacts:');
            console.log(Object.keys(results.artifacts));

            console.log('report:');
            console.log(Object.keys(results.report));
*/
            let testResults = results.lhr.audits;
            let obj = {};
            obj.url = urlBeingTested;
            obj.firstMeaningfulPaint = Math.floor(testResults['first-meaningful-paint'].rawValue);
            obj.firstContentfulPaint = Math.floor(testResults['first-contentful-paint'].rawValue);
            obj.totalByteWeightValue = Math.floor(testResults['total-byte-weight'].displayValue[1]);
            obj.domNodesValue = Math.floor(testResults['dom-size'].rawValue);

            console.log(' ~ Results for ' + obj.url + ' ~ ');
            console.log('ms to First Meaningful Paint - ' + obj.firstMeaningfulPaint);
            console.log('ms to First Contentful Paint - ' + obj.firstContentfulPaint);
            console.log('Total Page Weight - ' + obj.totalByteWeightValue);
            console.log('# of DOM nodes - ' + obj.domNodesValue);

          return chrome.kill().then(() => callback(null))
        })
        .catch((error) => {
          // Handle errors when running Lighthouse
          console.log('looks like an error occurred');

          return chrome.kill().then(() => callback(error))
        })
    })
    // Handle other errors
    .catch(callback)
}