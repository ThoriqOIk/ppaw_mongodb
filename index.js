const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 4000;

// Tiket Model
const Ticket = require("./models/ticket");


// MongoURI
const MongoURI = "mongodb+srv://muhammadthoriq11:08122001Oik@cluster0.1arxxzv.mongodb.net/?retryWrites=true&w=majority";

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MongoURI);

const router = express.Router();

router.get("/", (req, res) => {
    res.render("home");
  });


  router.get("/travel", async (req, res) => {
    try {
      // Ambil data dari database (misalnya, semua data dari model Barang)
      const tiketData = await Ticket.find();
  
      // Kirim data ke tampilan EJS
      res.render("travel", { tiketData });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving data from the database");
      
    }
  });


  router.get("/travel", (req, res) => {
    res.render("travel");
  });


// CRUD 
router.post("/addticket", async (req, res) => {
    try {
      const { nama, tujuan, harga, jumlah, member, diskon, total } = req.body;
      const newTicket = new Ticket({ nama, tujuan, harga, jumlah, member, diskon, total });
      await newTicket.save();
      res.redirect("/travel");
    } catch (error) {
      console.error(error);
      res.redirect("/"); // Consider changing to "/alatmasuk" if it's intended
    }
  });

  router.post('/update-ticket/:id', async (req, res) => {
    try {
        const { nama, tujuan, harga, jumlah, member, diskon, total } = req.body;
        const ticketId = req.params.id;  // Use req.params.id to get the ID from the URL

        const updateTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { nama, tujuan, harga, jumlah, member, diskon, total },
            { new: true }
        );

        res.redirect("/travel");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating data in the database");
    }
});

router.post('/delete-ticket/:id', async (req, res) => {
  try {
      const ticketId = req.params.id; // Menggunakan req.params.id untuk mendapatkan ID dari URL

      const result = await Ticket.findByIdAndDelete(ticketId);
      res.redirect("/travel");
  } catch (error) {
      console.error(error);
      res.redirect("/");
  }
});




app.use("/", router);



 module.exports = app;