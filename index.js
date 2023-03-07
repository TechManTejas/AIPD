const express = require("express");
const nodeMailer=require("nodemailer");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const storage = require('sessionstorage')
const app = express();
const fs = require('fs')
var report_data="";
var email_ID="";
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));



app.get("/firstpage", function (req, res) {
  var date= new Date().toString().split(" ").slice(0, 4).toString()
  date=date.replace(/,/g, '  ');
  var time= new Date().toString().split(" ").slice(4, 5).toString()
  res.render("firstpage", { name: 'Anuj', DOB: '28-12-1979', PID: '676', Doctor_name: "Dr.Charith", Doctor_no: '9879869499',Specialization:'Physiotheraphy',Doctor_email:'charithcherry1100@gmail.com.com',Doctor_ID:623767,date:date,time:time });
});


app.get("/secondpage", function (req, res) {
  var date= new Date().toString().split(" ").slice(0, 4).toString()
  date=date.replace(/,/g, '  ');
  var time= new Date().toString().split(" ").slice(4, 5).toString()
  res.render("secondpage", { name: 'Anuj', DOB: '28-12-1979', PID: '676', Doctor_name: "Dr.charith", Doctor_no: '9879869499',Specialization:'Physiotheraphy',Doctor_email:'d@d.com',Doctor_ID:623767,date:date,time:time });
});


// app.get("/", function (req, res) {
//   res.render("home");
// });

app.get("/login", function (req, res) {

  res.render("login");
});
app.get("/register", function (req, res) {

  res.render("register" );
});

app.get("/", function (req, res) {

  res.render("home", { name: 'Anuj', DOB: '28-12-1979', PID: '676', Doctor_name: "Dr.charith", Doctor_no: '9879869499',Doctor_email:"charithcherry1100@gmail.com" });
});


app.post("/information", function (req, res) {

  var exercise=req.body['Exercise']
  exercise= exercise.replace(" ","_");
  var image="images/"+exercise+"-gif.gif"
  exercise="js/"+exercise+".js"
 
  // console.log(image)
  res.render("index",{exercise:exercise,image:image});
});

app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/report", function (req, res) {
  res.render("report");
});

app.post("/report_transport", function (req, res) {
 
  res.render("reportTemplate", { name: 'Anuj', DOB: '28-12-1979', PID: '676', Doctor_name: "Dr.charith", Doctor_no: '9879869499' ,Doctor_email:"charithcherry1100@gmail.com"});
});

app.post("/report", function (req, res) {
 
  //console.log(req.body.report_html);
  //nodemailer code
  email_ID=req.body.email;
  report_data=req.body.report;
  // console.log(email_ID)
  // console.log(report_data)
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'testteam9832@gmail.com',
        pass: 'fmwgwwwiigkyyxfv'
    }
});
let mailOptions = {
  from: '"AIPD" testteam9832@gmail.com', // sender address
  to: email_ID, // list of receivers
  subject: "Report", // Subject line
  //text: report_data, // plain text body
  html:req.body.report_html

};
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
  res.render("home", { name: 'Anuj', DOB: '28-12-1979', PID: '676', Doctor_name: "Dr.charith", Doctor_no: '9879869499' ,Doctor_email:"charithcherry1100@gmail.com"});

  });
  //res.render("home", { name: 'JACK', DOB: '28-12-1979', PID: '676', Doctor_name: "Dr.Siddharth", Doctor_no: '9879869499' ,Doctor_email:"charithcherry1100.com"});

});


app.listen(process.env.PORT || 3001, function () {
  console.log("Server is running on port 3001");
});