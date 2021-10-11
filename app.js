
const bodyParser = require("body-parser");
const express= require("express");
const https=require("https");
const app= express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    })
    app.post("/",function(req,res){
    const query=req.body.cityName;
    const apiKey="f5915d2192f429d00d97c4e48b7aa5c7";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;
    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data" , function(data){
        const wd=JSON.parse(data);
        const temp=wd.main.temp; 
        const weatherdesc=wd.weather[0].description;
        const icon=wd.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon+ "@2x.png"
        res.write("<p>Current weather "+ query +" is " + weatherdesc + " </p>");
        res.write("<h1>Temparature in "+ query +"  is  " + temp + " degrees celcius</h1>");
        res.write("<img src =" + imageURL +">");
        res.send();
    })

    })
})


app.listen( process.env.PORT ||  3000,function(){
    console.log("server is running on 3000");
});         