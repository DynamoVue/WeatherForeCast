require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'my-app', 'build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'my-app', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server starting !!');
});
