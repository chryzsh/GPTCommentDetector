// ==UserScript==
// @name         Identify AI-generated comments on Hacker News
// @namespace    https://example.com/
// @version      0.1
// @description  Identify AI-generated comments on Hacker News
// @author       You
// @match        https://news.ycombinator.com/*
// @grant        none
// @connect      huggingface.co
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_addElement
// @grant		GM_registerMenuCommand
// @grant   GM_xmlHttpRequest
// @grant         GM.xmlHttpRequest
// @grant		unsafeWindow
// @sandbox		JavaScript
// ==/UserScript==

// Set a threshold for the minimum probability that a comment is AI-generated
const AI_THRESHOLD = 0.99;
const PROBABLE_THRESHOLD = 0.9;
const TOKEN_THRESHOLD = 200; //4 characters are about 50 tokens, which is when the detector model because reliable

// put all comments into a NodeList
const comments = document.querySelectorAll('.comment');
//console.log(comments);

// loop over each comment, running the AI detection
comments.forEach((comment) => {
  var textLength = comment.textContent.length;
  detectAI(comment.textContent, function(result) {
      //console.log("result is:" + result);
      //console.log("comment is: " + comment);
    testLength(result, comment);

    });
});


function testLength(result, comment) {
    var textLength = comment.textContent.length;

    // test the length first
    if (comment.textContent.length < TOKEN_THRESHOLD) {
      //console.log("not enough tokens for reliable data: " + textLength)
      comment.style.border = '1px solid gray';
      comment.innerHTML += `<div style="color: gray; font-weight: bold;">Insufficient data to assess if AI generated</div>`;
    }
    else {
      //console.log("enough data to assess: " + textLength);
      addComment(result, comment);
    }
}

function addComment(result, comment) {

    //comments.forEach((comment) => {
      var json = JSON.parse(result);
      var fakeProbability = json.fake_probability;
      var realProbability = json.real_probability;
      var formattedNumberAI = (fakeProbability*100).toFixed(3);
      var formattedNumberHuman = (realProbability*100).toFixed(3);
      //console.log("fake prob: " + formattedNumberAI); // expected Output for input string "test" = 0.9973894953727722
      //console.log("real prob: " + formattedNumberHuman)

      // most comments will not be AI (hopefully) so start with testing that
      if (fakeProbability < PROBABLE_THRESHOLD) { //assume not AI if lower than 0.7 on the AI-meter
          comment.style.border = '1px solid green';
          comment.innerHTML += `<div style="color: green; font-weight: bold;">Definitely human - human probability ${formattedNumberHuman}</div>`;
      }

      // If the probability is above the threshold, label the comment as AI-generated
     else if (fakeProbability > PROBABLE_THRESHOLD){ // possibly AI
       if (fakeProbability > AI_THRESHOLD) { //definitely AI

          comment.style.border = '1px solid red';
          comment.innerHTML += `<div style="color: red; font-weight: bold;">Definitely AI - AI probability ${formattedNumberAI}</div>`;
      }
       else {
        comment.style.border = '1px solid orange';
        comment.innerHTML += `<div style="color: orange; font-weight: bold;">Possibly AI - AI probability ${formattedNumberAI}</div>`;
      }
     }
};

function detectAI(input, callback) {
  var url = "https://huggingface.co/openai-detector?"+input
  GM.xmlHttpRequest({
  method: "GET",
  url: url,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Content-Type": "application/x-www-form-urlencoded"
    //"Accept": "text/xml"            // If not specified, browser defaults will be used.
    ,
  },

  onload: function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }
    var responseParsed = [response.responseText].join("\n");
    //console.log("input was: " + input);
    //addComment(responseParsed);
    callback(responseParsed);
  }
});
}

