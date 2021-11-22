const request = require("request");

class ApiCaller {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async call(options) {
    options.url = this.endpoint + options.url;
    options.json = true; // KAS API mostly returns json

    if (!options.headers) options.headers = {};

    // Add a header that always goes in automatically.
    options.headers["Content-Type"] = "application/json";
    options.headers["x-chain-id"] = "1001";
    options.headers.Authorization =
      "Basic S0FTS0JKM1c0UTNOSVhPRzNYR0JDNlJZOllqbDlDZnVTcEJSNVRCVzVTR0JBT3F2NXQ4aWc3ZWZiR2VhR3RmbU8=";

    return new Promise((resolve, reject) => {
      // Add a code that asynchronously processes the request part in the Request Sample
      request(options, function (error, _response, body) {
        if (error) reject(error);
        else resolve(body);
      });
    });
  }
}

module.exports = ApiCaller;

/**
 * Request Sample

const request = require('request'); // using request package

const options = {
  // parameter we want
  method: 'POST',
  url: 'https://wallet-api.klaytnapi.com/v2/account',
  headers: {
    'Content-Type': 'application/json',
    'x-chain-id': '',
    Authorization: 'Basic S0FTS1JRVkhGTFlXWTVSRk5ITk9FTUQ1OmNnUGZCaktjNXY5a3hRZDZYb2VYMTFqR0plX3BsQlV4bV9JVjlNRl8='
  }
};

request(options, function (error, response, body) {
  // API Call
  // api_caller.js는 개발의 편의를 위해 이 부분을 분리를 해놓은 코드
  if (error) throw new Error(error);

  console.log(body);
});

*/
