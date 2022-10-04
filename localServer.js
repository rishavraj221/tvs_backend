const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { main_func } = require("./index");
const { giveToken } = require("./auth");
const { uploadPdf, getPdf } = require("./s3Upload");
const { updatePdf, scanAllPdfs } = require("./dynamo");

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

const app = express();

// create application/json parser
const jsonParser = bodyParser.json({ limit: "50mb" });

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// app.use(multer());
app.use(cors(corsOpts));
app.post("/html-to-pdf", jsonParser, async (req, res) => {
  const event = { ...req.body };

  const result = await main_func(event);

  res.send(result);
});

app.post("/give-token", jsonParser, async (req, res) => {
  const event = { ...req.body };

  const result = await giveToken(event);

  res.send(result);
});

app.post("/upload-pdf", jsonParser, async (req, res) => {
  const event = { ...req.body };

  const result = await uploadPdf(event);

  res.send(result);
});

app.post("/get-pdf", jsonParser, async (req, res) => {
  const event = { ...req.body };

  const result = await getPdf(event);

  res.send(result);
});

app.post("/update-pdf", jsonParser, async (req, res) => {
  const event = { ...req.body };

  const result = await updatePdf(event);

  res.send(result);
});

app.get("/all-pdfs", jsonParser, async (req, res) => {
  const result = await scanAllPdfs();

  res.send(result);
});

const server = app.listen(8082, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
