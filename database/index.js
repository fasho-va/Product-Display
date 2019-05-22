const { Client } = require('pg')
const client = new Client({
  user: 'hunternmason',
  host: 'product-display-db.cprofozo9bor.us-east-2.rds.amazonaws.com',
  database: 'productdisplaydb',
  password: 'jcm800mason',
  port: 5432
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