const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended : true }));

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(`${__dirname}/signup.html`);
})

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const userEmail = req.body.userEmail;

    const data = {
        members: [
            {
                email_address: userEmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/6218d6fff1";
    
    const options = {
        method: "POST",
        auth: "Kshitij1:73be504043942e43f47b99129008ea4c-us20"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})

// API Key
// 73be504043942e43f47b99129008ea4c-us20

// List id 
// 6218d6fff1