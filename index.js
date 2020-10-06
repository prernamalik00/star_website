const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const e = require('express');
const { strict } = require('assert');
const path = require('path');
const {google} = require('googleapis');
// var ghpages = require('gh-pages');
 
// ghpages.publish('dist', function(err) {});



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views/static"));


// go below for writing the data

// Writing the data into the spreadsheets

let count = 2;

let register = 2;

async function writeData(arr){
    const auth = await new google.auth.GoogleAuth({
        keyFile: './key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    const sheets = await google.sheets({version: 'v4', auth: auth});

    await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: '1pK1VKKGF7pGbhPzDZnh39nEDGylWZ5zxEduha1xtzIM',

            requestBody: {
                data: [
                    {
                        range: `Sheet1!A${count}:D${count}`,
                        majorDimension: "COLUMNS",
                        values: arr
                    }
                ],
                valueInputOption: "USER_ENTERED"
            }
    }
    );
            count += 1;
}


// Below is for updating the registartions data 

async function registerData(arr){
    const auth = await new google.auth.GoogleAuth({
        keyFile: './key.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    const sheets = await google.sheets({version: 'v4', auth: auth});

    await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: '12q6VosuGSz3efO6_apCGu1immioQLrzdok8cLwVYNh8',

            requestBody: {
                data: [
                    {
                        range: `Sheet1!A${register}:O${register}`,
                        majorDimension: "COLUMNS",
                        values: arr
                    }
                ],
                valueInputOption: "USER_ENTERED"
            }
    }
    );
            register += 1;
}

app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req, res){
    res.render('index');
});

app.get("/register", function(req, res){
    res.render('Alum-reg');
});

app.get("/contact", (req, res)=>{
    res.render('contact')
})

app.post('/', (req, res) => {
    console.log(req.body);

    let UserData = [[req.body.email], [req.body.firstname], [req.body.from], [req.body.msg]];
    writeData(UserData);
    res.render('index');
});
app.get('/register', (req,res)=>{
    res.sendFile(path.join(__dirname, "/form.html"))
})
app.post('/register', (req,res)=>{
    console.log(req.body);

    let UserData = [[req.body.firstname], [req.body.lastname], [req.body.email], [req.body.contact], [req.body.course], [req.body.branch], [req.body.city], [req.body.organisation], [req.body.designation], [req.body.exams], [req.body.examyear], [req.body.highcourse], [req.body.institute], [req.body.year]];
    registerData(UserData);
    res.render('index');
})

app.get("/our-team", (req, res)=>{
    res.render('our-team');
});

app.get("/aboutus", (req, res)=>{
    res.render('aboutus');
});

app.listen(3000, function(){
    console.log("Server running at port 3000");
});





