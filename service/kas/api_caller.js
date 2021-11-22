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
    options.headers["x-chain-id"] = "1001";
    options.headers["content-type"] = "application/json";
    options.headers.Authorization =
      "Basic S0FTS1JRVkhGTFlXWTVSRk5ITk9FTUQ1OmNnUGZCaktjNXY5a3hRZDZYb2VYMTFqR0plX3BsQlV4bV9JVjlNRl8=";

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
