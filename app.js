const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    var jsonData = JSON.stringify(data);
    const url = "https: //us1.api.mailchimp.com/3.0/lists/4bb4f8b9cd"
    const options = {
        method: "POST",
        auth: "Rishabh:37ea0a2590c241fb6ad0bb33e5fb80b1-us1"
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

app.listen(3000, function() {
    console.log("Server started successfully on port 3000");
})


//API key-  37ea0a2590c241fb6ad0bb33e5fb80b1-us1
//List ID-  4bb4f8b9cd