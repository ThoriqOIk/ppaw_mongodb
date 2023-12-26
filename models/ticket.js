const mongoose = require("mongoose");

const tiketSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    tujuan: {
        type: String,
        required: true,
    },
    jumlah: {
        type: String,
        required: true,
    },
    harga: {
        type: String,
        required: true,
    },
    member: {
        type: String, 
       
    },
    diskon: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    }
});

const Tiket = mongoose.model("Tiket", tiketSchema);

module.exports = Tiket;
