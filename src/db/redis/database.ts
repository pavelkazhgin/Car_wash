'docker run --name myrediskeystore -d redis:latest'

const redis = require("redis");

let rediscl = redis.createClient();


rediscl.on("connect", function () {
  console.log("Redis plugged in.");
});

module.exports = { rediscl }
