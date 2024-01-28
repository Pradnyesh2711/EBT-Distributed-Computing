import express from "express";
import Expense from "../schema/expenseSchema.js";

const expenseRouter = express.Router();

//GET
expenseRouter.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (e) {
    console.log("Error : ", e);
    return res.status(400).send({
      msg: e.message,
    });
  }
});

//POST
expenseRouter.post('/', async (req, res) => {
    try {
      const { date, description, amount, category } = req.body;
      if(!date || !description || !amount || !category){
        return res.status(400).send("Please enter all data")
      }
      // Create a new expense
      const newExpense = await Expense.create({
        date,
        description,
        amount,
        category,
      });
  
      return res.status(200).send({
        msg: "Expense added!",
        data: newExpense,
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(400).send({
        msg: error.message || "An error occurred while adding the expense.",
      });
    }
  });

  //PUT
  expenseRouter.put('/:id', async (req, res) => {
    try {
      
      const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedExpense);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  });

  //Delete
  expenseRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Expense.findByIdAndDelete(id);
  
      if (result) {
        return res.status(200).send({ msg: "Expense deleted successfully!" });
      } else {
        return res.status(404).send({ msg: "Expense not found!" });
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
  
  
  export default expenseRouter;
