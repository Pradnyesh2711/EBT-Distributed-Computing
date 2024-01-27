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
    res.status(400).send({
      msg: e.message,
    });
  }
});

//POST
expenseRouter.post('/', async (req, res) => {
    try {
      const { date, category, description, amount } = req.body;
  
      // Create a new expense
      const newExpense = await Expense.create({
        date,
        category,
        description,
        amount,
      });
  
      res.status(200).send({
        msg: "Expense added!",
        data: newExpense,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(400).send({
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
      await Expense.findByIdAndDelete(req.params.id);
      res.sendStatus(204); 
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  });
  
  export default expenseRouter;
