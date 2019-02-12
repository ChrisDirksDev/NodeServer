const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.options('*', cors()) // include before other routes
//app.use(express.static(path.join(__dirname, '../chris-website/build')));
app.use(bodyParser.json())
let port = process.env.PORT || 3000; 
app.listen(port)


app.post('/mail', (req, res) => sendemail(req.body, res).catch(error => {console.log(error)}));
app.get('/', (req, res) => res.send('hola'));


sendemail = async ({name, email, message}, res) =>{
    let nodemailer = require('nodemailer');

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
        from: process.env.MAIL_USER, // sender address
        to: "chrisdirks.developer@gmail.com", // list of receivers
        subject: name + ' ' + email, // Subject line
        text: message, // plain text body
        html: "" // html body
    };

    let info = await transporter.sendMail(mailOptions)

    console.log("Message sent: %s", info.messageId);

    res.send('email sent')
}