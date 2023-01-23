'docker run --name myrediskeystore -d redis:latest'
require('dotenv').config();

import { RedisClientType } from "@redis/client";

const redis = require("redis");

class Redis {
  constructor(){}

  clientOn(){
    let client =  redis.createClient({
      host: process.env.HOST,
      port: process.env.PORT
    })
    if (!client){
      console.log("Redis-client dont crate connection")
    }
    return client;
  }
}

const redisCli = (new Redis()).clientOn();

export default redisCli 
