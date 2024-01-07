// models/booking.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abhinava03kks:showsnow@clustershowsnow.0ijtawv.mongodb.net/?retryWrites=true&w=majority").then((response)=>{
  console.log("Connected to database of Payment")
})
.catch((error)=>{
  console.log(error);
  console.log("Not connected to the database of Payment");
})
const bookingSchema =   mongoose.Schema({
  session: { type: String, required: true },
  timing: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  // Add more fields as needed
});

module.exports = mongoose.model("Booking", bookingSchema);
