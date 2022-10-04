const express = require('express');
const request = require('request');
const https = require('https');
const bodyparser = require('body-parser');
const { AsyncResource } = require('async_hooks');

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/", (req,res)=>{
      res.sendFile(__dirname + "/signup.html");
});


app.post("/", (req,res)=>{
      const firstName = req.body.firstname;
      const lastName = req.body.lastname;
      const email = req.body.email;

      var data = {
            members : [
                  {
                  email_address : email,
                  status : "subscribed",
                  merge_fields : {
                        FNAME : firstName,
                        LNAME : lastName
                  }
                  }
            ]
      };

      const jsonData = JSON.stringify(data);
      const url = "https://us14.api.mailchimp.com/3.0/lists/13949b01d9"
      
      const option= {
            method : "POST",
            auth : "anuj1:cce938bfa23cd3904f4e588a0237c9a6-us14"
      }
      
     const request = https.request(url,option, (response)=>{
      if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
      }

      else {
            res.sendFile(__dirname + "/failure.html")
      }
            response.on("data", (data)=>{
                  console.log(JSON.parse(data));
            })
      })

      request.write(jsonData);
      request.end();
});

app.post("/failure", (req,res)=>{
      res.redirect("/");
})

app.listen(process.env.PORT || 3000, (req,res)=>{
      console.log("Server successfully started :)")
});

//7865cccc16948cdd70c1f05926d24de2-us9

//List id = 8179f2c368









//cce938bfa23cd3904f4e588a0237c9a6-us14
//13949b01d9