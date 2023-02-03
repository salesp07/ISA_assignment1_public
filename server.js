const express = require("express");
const app = express();
const cors = require('cors');
require('./db');

// require router
const api_v1 = require('./routes/api-v1.js')

app.use(express.json());
app.use(cors());

// Use Router
app.use('/api/v1', api_v1)

app.get('/api/doc', (req, res)=>{
  res.sendFile(__dirname + '/html/index.html')
})

app.get('*', (req, res)=>{
  res.status(404).json({msg: 'Improper route. Check API docs plz.'})
})

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});