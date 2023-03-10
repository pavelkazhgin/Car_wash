require('dotenv').config();
const http = require('http')
const app = require("./src/app").app;

const PORT = process.env.PORT;
const HOST = process.env.HOST;


const server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`, new Date((new Date()).getTime() + 1000*60*3))
})
