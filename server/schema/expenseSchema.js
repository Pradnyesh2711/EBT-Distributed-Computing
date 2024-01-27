import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
