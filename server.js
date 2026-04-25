const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/route", async (req, res) => {
  try {
    let url = req.query.url;
    if (!url) return res.send("no url");

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const text = await response.text();
    res.send(text);

  } catch (e) {
    console.error(e);
    res.send("node error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Node running"));
