const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')

const app = express();

app.use(bodyParser());

app.use(express.static('./client/public'))

app.get('/products:id', (req, res) => {
    let totalInfo = {};
    console.log(req.params);
    db.getProductImages(req.params.id, (err, results) => {
        if (err) {
            console.log('err')
            res.send();
        } else {
            console.log('success image get')
            totalInfo.images = results.rows
            db.getProductInfo(req.params.id, (err, results) => {
                if (err) {
                    console.log('err')
                    res.send();
                } else {
                    console.log('success product get')
                    totalInfo.product = results.rows[0]
                    res.send(totalInfo);
                }
            })
        }
    })
})

app.listen(3003, () => {
    console.log('listening on port 3003')
})