const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(port, () => {
  console.log(`server listen at port ${port}`)
});
