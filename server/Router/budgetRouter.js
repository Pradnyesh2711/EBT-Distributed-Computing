import express from 'express';
import Budget from '../schema/budgetSchema.js';

const budgetRouter = express.Router();

// POST 
budgetRouter.post('/', async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(amount);

    const existingBudget = await Budget.findOne();

    if (existingBudget) {
      return res.status(400).json({ message: 'Budget already exists' });
    }
    
    const newBudget = await Budget.create({ amount });

    res.status(201).json({ message: 'Budget added successfully', data: newBudget });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to add budget', error: error.message });
  }
});


// GET 
budgetRouter.get('/', async (req, res) => {
  try {
    const budget = await Budget.findOne();
    res.json(budget);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch budget', error: error.message });
  }
});

// PUT
budgetRouter.put('/', async (req, res) => {
  try {
    const { amount } = req.body;

    const updatedBudget = await Budget.findOneAndUpdate({}, { amount }, { new: true });

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ message: 'Budget updated successfully', data: updatedBudget });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to update budget', error: error.message });
  }
});

// DELETE 
budgetRouter.delete('/', async (req, res) => {
  try {
    const deletedBudget = await Budget.findOneAndDelete();

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.sendStatus(204); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to delete budget', error: error.message });
  }
});

export default budgetRouter;
