// npm run dev to start server.js with nodemon or node server.js without nodemon
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const fs = require("fs");
const files = fs.readFileSync("success.html");
const app = express();
app.use(express.static(__dirname + "/public"));

var Secret_Key = process.env.API_KEY;
// install the stripe package
const stripe = require("stripe")(Secret_Key);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let totalAmount = 0;
let serviceCharge = 0;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Pform.html"); //  Listening to a Default page
});

app.post("/", urlencodedParser, (req, res) => {
  // User form inputs
  console.log(req.body.name);
  console.log(req.body.crd_no);
  console.log(req.body.expiry_month);
  console.log(req.body.expiry_year);
  console.log(req.body.cvc);
  console.log(req.body.total_cost);
  totalAmount = req.body.total_cost;
  serviceCharge = req.body.t_fee;
  // Create Token before card every token for each card.
  // Create a PaymentIntent with the order amount and currency

  stripe.tokens.create(
    {
      card: {
        number: req.body.crd_no,
        exp_month: req.body.expiry_month,
        exp_year: req.body.expiry_year,
        cvc: req.body.cvc,
      },
    },
    function (err, token) {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("PaymentFailed.html", "UTF-8").pipe(res);
      } else {
        stripe.customers
          .create({
            email: "User@gmail.com",
            source: token.id,
            name: req.body.name,
            address: {
              line1: "North circular road dublin 7",
              postal_code: "D07Ab0K",
              city: "Dublin",
              state: "IRL",
              country: "Ireland",
            },
          })
          .then((customer) => {
            return stripe.charges
              .create({
                amount: totalAmount + 0 + 0, // Charing amount
                description: "Product name or description",
                currency: "Eur",
                customer: customer.id,
              })
              .then((charge) => {
                res.writeHead(200, { "Content-Type": "text/html" });
                fs.createReadStream("success.html", "UTF-8").pipe(res);
              })
              .catch((err) => {
                res.send("Error: Something went wrong "); // If some error occurs
              });
          });
      }
    }
  );
});

app.listen(2000);
