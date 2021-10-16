const mongoose = require("mongoose")
const { Schema } = require("mongoose")
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log("connecting to", url)

mongoose.connect(url)
  .then(result => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Mongo connection failed", error.message)
  })

const personSchema = new Schema({
  _id: Number,
  name: String,
  number: String
}, { versionKey: false })

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

module.exports = mongoose.model('Person', personSchema)