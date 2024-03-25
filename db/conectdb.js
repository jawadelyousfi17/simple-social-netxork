const mongoose = require('mongoose')

require('dotenv').config();

// const dburl = 'mongodb://127.0.0.1:27017/socialnetwork'
const dburl = 'mongodb+srv://jawadpro17:KpNOLJeq9DZQ7kej@cluster0.7d1lwm6.mongodb.net/social'

const conectDb = async (conected) => mongoose.connect(dburl).then(
    (result) => {
        conected()
        console.warn('Db conected')
    }
).catch(
    (err) => console.error(err)
)

module.exports = conectDb
