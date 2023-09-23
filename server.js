require("dotenv").config();

const express = require("express");
const app = express();
var multer = require('multer');
const bodyParser = require("body-parser");
const cors = require("cors");
var upload = multer();
const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

app.use(
    cors({ origin: '*' })
  );

  app.use(bodyParser.json()); 
  
  // for parsing application/xwww-
  app.use(bodyParser.urlencoded({ extended: true })); 
  //form-urlencoded
  
  // for parsing multipart/form-data
  app.use(upload.array()); 
  app.use(express.static('public'));
  //app.use(flash())
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();});


    app.post("/chat", async (req, res) => {
        const { prompt } = req.body;

        const completions = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                max_tokens: 200,
                temperature: 0.2, 
                messages: [{"role": "user", "content": prompt}],
        })

        res.send(completions.choices[0].message)
    })



    const port = process.env.PORT || 5000

    app.listen(port, () => {
        console.log("Listening on port " + port)
    })
