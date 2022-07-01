import express from "express";
import bodyParser from "body-parser";

import { listings } from "./listings";

const app = express();

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome Zagazaga");
});

app.get("/listings", (req, res) => {
  res.send(listings);
});

app.post("/delete-listing", (req, res) => {
  const { id } = req.body;

  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings[i]);
    }
  }

  return res.send(`Listings with ID ${id} not found`);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
