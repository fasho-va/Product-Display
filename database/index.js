const { Client } = require('pg')
const client = new Client({
    user: 'huntermason',
    host: 'localhost',
    database: 'products'
})

client.connect()

const getProductInfo = (id, cb) => {
    client.query(`SELECT * FROM information WHERE uuid = ${id}`, (err, results) => {
        if (err) {
            console.log('error')
            cb(err, null)
        } else {
            cb(null, results)
        }
    })
}

const getProductImages = (id, cb) => {
    client.query(`SELECT * FROM images WHERE product_id = ${id}`, (err, results) => {
        if (err) {
            console.log('error')
            cb(err, null)
        } else {
            cb(null, results)
        }
    })
}

module.exports.getProductInfo = getProductInfo;
module.exports.getProductImages = getProductImages;