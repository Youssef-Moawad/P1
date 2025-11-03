// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('view engine', 'ejs');
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // 1️⃣ No date → current time
  if (!dateParam) {
    date = new Date();
  } 
  // 2️⃣ If it's all digits → treat as Unix timestamp (milliseconds)
  else if (/^-?\d+$/.test(dateParam)) {
    const timestamp = parseInt(dateParam);  // parse as number
    date = new Date(timestamp);
  } 
  // 3️⃣ Otherwise → try parsing as string (e.g. "2015-12-25")
  else {
    date = new Date(dateParam);
  }

  // 4️⃣ Validate date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // 5️⃣ Return JSON
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
