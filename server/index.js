const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());

app.use(express.static('./client/public'))

app.listen(3003, () => {
    console.log('listening on port 3003')
})