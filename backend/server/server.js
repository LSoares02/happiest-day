require("dotenv").config();

// import dependencies and initialize express
const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cloudantRoutes = require("./routes/cloudant");
app.use("/cloudant", cloudantRoutes);

app.use(express.static(path.join(__dirname, "../build")));

app.all("", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../build", "index.html"));
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
});

module.exports = app;
