import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./due-expense.css";
import dateFormat from "dateformat";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const DueExpenses = () => {
  const [limit, setLimit] = useState(0);

  const [sortedListArray, setSortedListArray] = useState([]);
  const handleMonthlyBudget = (e) => {
    setLimit(e.target.value);
  };




  useEffect(() => {
    axios.get("http://192.168.62.78:5000/api/budget").then((res) => {
      if (res.status >= 200 && res.status <= 300) {
        console.log(res.data);
        setLimit(res.data.amount);
      } else {
        console.log("Failed to fetch budget data");
      }
    }
    );

  }, [])

  useEffect(() => {
    fetchExpenses();
  }, [limit])



  const fetchExpenses = async () => {
    try {
      let tempLimit = limit;
      const response = await axios.get("http://192.168.62.78:5000/api/expenses");
      const expenses = response.data;
      let tempData = expenses.sort((a, b) => a.amount - b.amount).map((v) => {
        if (tempLimit >= v.amount) {
          tempLimit -= v.amount;
          return { ...v, isHighlighted: true }
        }
        else {

          return { ...v, isHighlighted: false }
        }



      })
      setSortedListArray(() => tempData); // Assuming you have a state variable named `list` to store the expenses

      console.log(tempData);

    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };


  const handleLimit = async () => {
    try {
      // Check if budget data already exists
      const existingBudgetRes = await axios.get(
        "http://192.168.62.78/api/budget"
      );
      if (existingBudgetRes.status >= 200 && existingBudgetRes.status <= 300) {
        // If budget data exists, extract the ID
        const existingBudget = existingBudgetRes.data;
        if (existingBudget) {
          const budgetId = existingBudget._id;
          // Use PUT request to update existing budget
          const updateRes = await axios.put(
            `http://192.168.62.78/api/budget/${budgetId}`,
            {
              amount: limit,
            }
          );
          if (updateRes.status >= 200 && updateRes.status <= 300) {
            toast("Budget updated in the database");
          } else {
            console.log("Failed to update budget in the database");
          }
        }
      } else {
        // If no budget data exists, add a new budget record with POST request
        const res = await axios.post("http://192.168.62.78/api/budget", {
          amount: limit,
        });
        if (res.status >= 200 && res.status <= 300) {
          console.log("Budget added");
          alert("Budget set");
        } else {
          console.log("Enter valid budget");
          toast("Enter valid budget");
        }
      }
    } catch (e) {
      console.log(e.message);
    }

    let array = [...sortedListArray];
    let totalSum = 0;
    array.forEach((element) => {
      element["isHighlighted"] = false;
    });
    array.forEach((element) => {
      if (element.amount <= limit - totalSum) {
        element["isHighlighted"] = true;
        totalSum += parseInt(element.amount);
      }
    });
    setSortedListArray(array);
  };

  return (
    <div className="due-expenses">
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      <div className="input-bill-amount">
        <label className="input-bill-amount-label">
          Enter your Monthly Budget
        </label>
        <input
          type="Number"
          className="input-bill-amount-field"
          placeholder=" Budget (INR)"
          value={limit}
          onChange={handleMonthlyBudget}
        />
        <button onClick={handleLimit} className="add-expense-btn">
          Submit
        </button>
      </div>
      <div className="bills-information">
        <div className="color"></div>
        <span>Highlighed Bills That Can Be Paid</span>
      </div>
      <div className="table">
        <div className="table-container">
          <div className="table-header">
            <div className="table">
              <div className="table-row">
                <div className="table-column expense-id-head">
                  <div className="">ID</div>
                </div>
                <div className="table-column date-head">
                  <div className="">DATE</div>
                </div>
                <div className="table-column category-head">
                  <div className="">CATEGORY</div>
                </div>
                <div className="table-column description-head">
                  <div className="">DESCRIPTION</div>
                </div>
                <div className="table-column amount-head">
                  <div className="">AMOUNT (INR)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="table-body">
            <div className="table">
              {sortedListArray.length ? (
                sortedListArray.map((data, i) => {
                  return (
                    <div key={i} className="table-row">
                      <div
                        className={
                          data["isHighlighted"]
                            ? "table-column expense-id highlighted"
                            : "table-column expense-id"
                        }
                      >
                        <div>{i + 1}</div>
                      </div>
                      <div
                        className={
                          data["isHighlighted"]
                            ? "table-column date highlighted"
                            : "table-column date"
                        }
                      >
                        <div>{dateFormat(data.dueDate, "dd-mm-yyyy")}</div>
                      </div>
                      <div
                        className={
                          data["isHighlighted"]
                            ? "table-column category highlighted"
                            : "table-column category"
                        }
                      >
                        <div>{data.category}</div>
                      </div>
                      <div
                        className={
                          data["isHighlighted"]
                            ? "table-column description highlighted"
                            : "table-column description"
                        }
                      >
                        <div>{data.description}</div>
                      </div>
                      <div
                        className={
                          data["isHighlighted"]
                            ? "table-column amount highlighted"
                            : "table-column amount"
                        }
                      >
                        <div>{data.amount}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-table">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/searching-in-box-3428236-2902705.png"
                    className="empty-image"
                    alt="Table Empty"
                  />
                  <p>
                    Uh Oh! Looks like the table is empty. Change your search
                    filters or maybe we don't have such an expense :(
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueExpenses;
