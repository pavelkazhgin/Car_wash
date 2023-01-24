
require('dotenv').config();

const redis = require("redis");

class Redis {
  constructor(){}

  createClient(){
    const redisCli  = redis.createClient();
    redisCli.on('error', (err: any) => console.log('Redis Client Error', err));
    redisCli.connect();
    return redisCli;
  }
  
}

const redisCli = new Redis().createClient();

export default redisCli; 
