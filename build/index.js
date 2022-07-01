"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const listings_1 = require("./listings");
const app = (0, express_1.default)();
const PORT = 5000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome Zagazaga");
});
app.get("/listings", (req, res) => {
    res.send(listings_1.listings);
});
app.post("/delete-listing", (req, res) => {
    const { id } = req.body;
    for (let i = 0; i < listings_1.listings.length; i++) {
        if (listings_1.listings[i].id === id) {
            return res.send(listings_1.listings[i]);
        }
    }
    return res.send(`Listings with ID ${id} not found`);
});
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
