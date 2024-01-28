import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;

