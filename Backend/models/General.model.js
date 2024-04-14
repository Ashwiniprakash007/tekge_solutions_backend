const mongoose = require("mongoose")


const generalSchema = new mongoose.Schema({
    taskname: {type: String, required: true},
     userId: {type: String, required: true}
})

const GeneralModel = mongoose.model("general", generalSchema)


module.exports = GeneralModel
