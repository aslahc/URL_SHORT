const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const shortid = require("shortid");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Connect to MongoDB with proper error handling

mongoose.connect("mongodb://127.0.0.1:27017/url");
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  shortId: String,
});

const Url = mongoose.model("Url", urlSchema);

// Routes
app.post("/shorten", async (req, res) => {
  try {
    console.log("new");
    const { originalUrl } = req.body;
    const shortId = shortid.generate();
    console.log(shortId);
    console.log(`http://localhost:5000/${shortId}`);
    const shortUrl = `http://localhost:5000/${shortId}`;

    const newUrl = new Url({ originalUrl, shortUrl, shortId });

    await newUrl.save();

    res.json(newUrl);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
