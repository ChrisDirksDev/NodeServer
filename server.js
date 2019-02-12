const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.options('*', cors()) // include before other routes
app.use(express.static(path.join(__dirname, '../chris-website/build')));
app.use(bodyParser.json())
app.listen(3001)

app.post('/mail', async (req, res) =>{

    let nodemailer = require('nodemailer');

    console.log(process.env.MAIL_SERVER);
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port: 465,
      secure: true, // true for 465, false for other ports
      name: process.env.MAIL_SERVER,
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS // generated ethereal password
      }
    });

    let mailOptions = { 
      from: req.body.name + ' ' + req.body.email, // sender address
      to: "chrisdirks.developer@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: req.body.message, // plain text body
      html: "" // html body
    };

    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);

    res.status(200);
})

app.get('/', async (req, res) =>{
    res.status(200);
})