const express = require("express")

const TodosModel  = require("../models/Todos.model")

const todosController = express.Router();


todosController.post("/create", async (req, res) => {
    const {taskname, status, tag, userId} = req.body;
    const new_note = new TodosModel({
        taskname,
        // status,
        // tag,
        userId
    })
    console.log(new_note,"nn")
    await new_note.save()
    res.send({"message": "note created", new_note}) 
})

// for getting the read properties we have to paste the Bearer token and Authorization from the post method. in the hedder portion.
// then we can read the given data in postman.
todosController.get("/read", async (req, res) => {
    const userId= req.headers.userid
    console.log(userId)
   const notes = await TodosModel.find({userId})
   res.send(notes)
 
});


// Update todo
todosController.put("/:todoId/update", async (req, res) => {
    const { todoId } = req.params;
    const { taskname, status, tag } = req.body;

    try {
        const updatedTodo = await TodosModel.findByIdAndUpdate(
            todoId,
            { $set: { taskname, status, tag } },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo updated", todo: updatedTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


todosController.delete("/:noteId/delete", async (req, res) => {
    const {noteId} = req.params;
    const {userId} = req.body;
    const note = await TodosModel.findOne({_id: noteId})
    if(note.userId === userId){
         await TodosModel.findOneAndDelete({_id: noteId})
        return res.send({"message": "sucessfully deleted"})
    }
    else{
     res.send("you are not authorize to do it")
    }
     
 })


module.exports = todosController