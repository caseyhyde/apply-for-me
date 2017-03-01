const express = require('express');
const router = express.Router();
var api = require('indeed-jobs-api').getInstance(process.env.INDEED_PUBLISHER_KEY);

var resultsObj = {};
var totalResults = 0;
var currentIndex = 0;
resultsArr = [];
var run = true;

router.get('/', function(req, res) {
  var keywords = req.headers.keywords;
  console.log("keywords: ", req.headers);
  function search(startIndex) {
    if(run) {
      api.JobSearch()
        .Radius(15)
        .WhereLocation({
          city : "Minneapolis",
          state : "MN"
        })
        .Limit(500)
        .Fromage(30)
        .Start(startIndex)
        .WhereKeywords([keywords])
        .SortBy("date")
        .UserIP("1.2.3.4")
        .UserAgent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36")
        .Search(
          function (results) {
            resultsObj = JSON.parse(results);
            console.log(resultsObj.totalResults);
            totalResults = resultsObj.totalResults;
            for(var i = 0; i < ((resultsObj.end - resultsObj.start) + 1); i ++) {
              resultsArr.push(resultsObj.results[i]);
            }
            currentIndex += 25;
            if(currentIndex > totalResults) {
              clearInterval(runSearch);
              res.send(resultsArr);
            }
          },
          function (error) {
            return console.log(error);
            res.sendStatus(500);
        });
    }
  }
runSearch = setInterval(function() {search(currentIndex)}, 4000);

})
module.exports = router;
