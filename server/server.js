const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('IOT1')
})

app.listen(port, () => {
  console.log(`Example app listening at https://ies-iot-1.herokuapp.com:8080`)
})