// import header from 'views/header.js';
const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const e = require('express');
const { strict } = require('assert');
const path = require('path');
const {google} = require('googleapis');



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views/static"));


// Code for using the mongo below. Uncomment to use instead of google sheets.

// mongo configarations

// const connectionString = "mongodb+srv://sampleuser:gauravDgreat@sample.gw2iw.mongodb.net/contactRequests?retryWrites=true&w=majority";

// mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (error, success) => {
//     if (error){
//         console.log(error.code + ", " + error.errmsg);
//     }else {
//         console.log('connected');
//         }
//     }
// );

// const contactSchema = new mongoose.Schema({
//     Email: String,
//     name: String,
//     message: String
// });

// const userModel = new mongoose.model('userModel', contactSchema);
//un comment the above lines for using mongo

// end of mongoose config

// express config

// place your static folders here for serving here

//app.use(express.static(path.join(__dirname, "user serving directory")))


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// Code for sheets API 


const auth = new google.auth.GoogleAuth({
    keyFile: './key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

// Read the values into the spreadsheets, The logic for fetching a particular value will be made later
// go below for writing the data

//
// function readData(auth){
//     const sheets = google.sheets({version: 'v4', auth: auth})
//     sheets.spreadsheets.values.get(
//         {
//             spreadsheetId: '1pK1VKKGF7pGbhPzDZnh39nEDGylWZ5zxEduha1xtzIM',
//             range: 'A1:B5'  
//         },(err, res)=>{
//             if (err){
//                 return console.log(err)
//             }
//             else{
//                 console.log(res)
//             }
//         }
//     )
// }


// Writing the data into the spreadsheets

let count = 1;
function writeData(auth, arr){
    const sheets = google.sheets({version: 'v4', auth: auth})
    sheets.spreadsheets.values.update(
        {
            spreadsheetId: '1pK1VKKGF7pGbhPzDZnh39nEDGylWZ5zxEduha1xtzIM',
            range: `A${count}`,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: arr
            }
        }, update => {
            console.log(update)
        }
    )
    count += 4;
}

app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req, res){
    res.render('index');
});

app.get("/contact", (req, res)=>{
    res.render('contact')
})

app.post('/', (req, res) => {
    console.log(req.body);

    ///////  Below code is for model of Mongoose Uncomment if u wanna use mongo instead of sheets API

    // let model = new userModel({
    //     Email: req.body.email,
    //     name: req.body.firstname,
    //     type: req.body.from,
    //     message: req.body.msg
    // })
    // model.save(err=>{
    //     if(err){
    //         console.log(err)
    //     }
    // })
    // console.log(model)

    let UserData = [[req.body.email], [req.body.firstname], [req.body.from], [req.body.msg]];
    writeData(auth, UserData);
})

app.get("/our-team", (req, res)=>{
    res.render('our-team');
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
});





