require('dotenv').config();

var path = require('path');
const express = require('express');

const app = express();
const router = require("./api/route")
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var dir = path.join(__dirname, 'public');

app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  preserveExtension: true,
  abortOnLimit: true,
  responseOnLimit: "Слишком большой размер изображения!"
}));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static(dir));
app.use(router);


export { app };

