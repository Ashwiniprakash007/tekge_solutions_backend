const mongoose = require("mongoose")


const todoSchema = new mongoose.Schema({
    taskname: {type: String, required: true},
    userId: {type: String, required: true},
    status: { type: String, enum: ["pending", "completed"], default: "pending" }
})

const TodosModel = mongoose.model("todos", todoSchema)


module.exports = TodosModel
