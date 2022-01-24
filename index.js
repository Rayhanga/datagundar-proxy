const axios = require("axios");
const cors = require("cors");
const express = require("express");

const baakInstance = axios.create({
  baseURL: "https://baak.gunadarma.ac.id",
});

const app = express();
const port = 3003;

app.set("view engine", "ejs");
app.use(cors());

app.get("/", async (req, res) => {
  res.json({
    status: "ok"
  })
})
app.get("/:site/*", async (req, res) => {
  const { site } = req.params;
  const targetURL = req.url.replace(`/${site}/`, "")
  switch (site) {
    case "baak":
      const baakProxy = await baakInstance
        .get(targetURL)
        .then((res) => {
          return res.data;
        });
      res.send(baakProxy);
      break;
    default:
      throw new Error("Wrong site target")
  }
});

app.listen(port, () => {
  console.log(`DataGundar Proxy listening at http://localhost:${port}`);
});
