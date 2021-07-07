import React, { useState, useEffect } from "react";
import "../css/app.css";

export default function Addtransaction(props) {
  const [amount, setAmount] = useState("");
  const [billtype, setBillType] = useState("");
  const [transtype, setTransType] = useState("");
  const [isdisable, setIsdisable] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    props.setTransactionsArr((prevVal) => {
      return [
        ...prevVal,
        {
          amount: parseInt(amount),
          billtype: billtype,
          transtype: transtype,
        },
      ];
    });

    props.setIsOpen(false);
  }

  useEffect(() => {
    function checkAble() {
      if (amount !== "" && billtype !== "" && transtype !== "") {
        setIsdisable("");
      } else {
        setIsdisable(true);
      }
    }

    checkAble();
  }, [amount, billtype, transtype]);

  return (
    <>
      <div className="add-transaction-container">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            value={amount}
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <input
            value={billtype}
            type="text"
            onChange={(e) => setBillType(e.target.value)}
            placeholder="Enter Type"
          />
          <div className="checkbox flex-row">
            <input
              type="radio"
              defaultChecked={transtype === "Expense"}
              name="type"
              value="Expense"
              onClick={() => setTransType("Expense")}
            />
            <span>Expense</span>
            <input
              type="radio"
              defaultChecked={transtype === "Income"}
              name="type"
              value="Income"
              onClick={() => setTransType("Income")}
            />
            <span>Income</span>
          </div>
          <button
            disabled={isdisable ? "true" : ""}
            style={{ cursor: isdisable ? "not-allowed" : "pointer" }}
            className="btn add-trans-btn"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </>
  );
}
