const mongoose = require('mongoose')

require('dotenv').config();

// const dburl = 'mongodb://127.0.0.1:27017/socialnetwork'
const dburl = 'mongodb+srv://jawadpro17:Jawad.18@ecomerce-api-db.ayaobei.mongodb.net/social?retryWrites=true&w=majority&appName=ecomerce-api-db'

const conectDb = async (conected) => mongoose.connect(dburl).then(
    (result) => {
        conected()
        console.warn('Db conected')
    }
).catch(
    (err) => console.error(err)
)

module.exports = conectDb
