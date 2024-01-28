import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from './config/db.js';
import expenseRouter from './Router/expenseRouter.js';
import budgetRouter from './Router/budgetRouter.js';

dotenv.config();
const app = express();

//const PORT = 5000;
connectDatabase();

app.use(express.json());
app.use(cors());

app.use('/api/expenses', expenseRouter);
app.use('/api/budget', budgetRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});