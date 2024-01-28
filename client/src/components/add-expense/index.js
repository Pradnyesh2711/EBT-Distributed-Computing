import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./add-expense.css";
import { addExpense } from "../../reduxstore/actions/expenses";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessModal from "./success-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState();
  const [dueDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { goBack } = useHistory();

  const handleSubmit = async () => {
    try {
      const data = {
        dueDate,
        description,
        amount,
        category,
        createdAt: new Date(),
      };
  
      //Move the logic outside the addData function
      const res = await axios.post('http://localhost:5000/api/expenses', data);
  
      if (res.status >= 200 && res.status < 300) {
        // Handle successful response
        console.log('Success:', res.data);
        
        // You can perform further actions here based on the successful response
      } else {
        // Handle unsuccessful response (non-2xx status code)
        toast("Please Enter Valid Data !!!");
        console.error('Unsuccessful response:', res.status, res.data);
        // You can perform further actions here based on the unsuccessful response
      }
      console.log('Add data executed')
      dispatch(addExpense(data));
      console.log('dispatch called');
      setModalOpen(true);
    } catch (error) {
      toast("Please Enter Valid Data !!!");
      console.error('Error in handleSubmit:', error);
    }
  };
  

  return (
    <div className="expense-details">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <SuccessModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className="expense-details-options">
        <div className="back-button " onClick={() => goBack()}>
          <i className="fi-rr-angle-left"></i>
          Back
        </div>
        <div className="cancel-button back-button" onClick={() => goBack()}>
          <i className="fi-rr-cross-circle"></i>
          Cancel
        </div>
      </div>
      <div className="expense-info">
        <div className="details-heading">Add Expense</div>
        <div className="expense-info-card">
          <div className="due-date-container">
            <label className="date-label">Choose Due Date - </label>
            <DatePicker
              className="due-date"
              selected={dueDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="form-item">
            <label>Description</label>
            <input
              placeholder="Add Expense description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label>Amount ₹</label>
            <input
              type="Number"
              placeholder="  Enter Expense Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label>Category</label>
            <input
              placeholder="   Enter Expense Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-add-button">
            <button className="add-expense-btn" onClick={handleSubmit}>
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
