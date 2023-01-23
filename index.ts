require('dotenv').config();
const http = require('http')
const app = require("./src/app").app;

const PORT = process.env.PORT;
const HOST = process.env.HOST;
console.log(__dirname,
//  process.env.DB_PASS,
// process.env.DB_NAME
)

const server = http.createServer(app);
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`)
})
