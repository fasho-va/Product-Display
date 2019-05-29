const { Client } = require('pg')
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '../env') });

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

client.connect()

const getProductInfo = (id, cb) => {
  client.query(`SELECT * FROM information WHERE product_id = ${id}`, (err, results) => {
    if (err) {
      console.log(err)
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