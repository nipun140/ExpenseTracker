import React, { useState, useEffect } from "react";
import "./css/app.css";
import Addtransaction from "./components/Addtransaction";
import Details from "./components/Details";
import Transaction from "./components/Transaction";

function App() {
  //hooks
  const [isOpen, setIsOpen] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactionsArr, setTransactionsArr] = useState([]);
  const [filterTxn, setFilterTxn] = useState([transactionsArr]);
  const [search, setSearch] = useState("");

  //filter logic,fired on every change in search input
  useEffect(() => {
    let timeOutId = setTimeout(() => {
      let txns = [...transactionsArr];
      let filteredArr = txns.filter((transactionObj) => {
        if (
          transactionObj.billtype
            .toLowerCase()
            .trim()
            .indexOf(search.toLowerCase().trim()) !== -1
        ) {
          return transactionObj;
        }
      });

      setFilterTxn(filteredArr);
    }, 250);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search]);

  //calculte the total income and total expense everytime when a tranaction is made
  useEffect(() => {
    let totalIncome = transactionsArr.reduce((accum, transactionObj) => {
      if (transactionObj.transtype === "Income") {
        return (accum += transactionObj.amount);
      } else {
        return accum;
      }
    }, 0);

    let totalExpense = transactionsArr.reduce((accum, transactionObj) => {
      if (transactionObj.transtype === "Expense") {
        return (accum += transactionObj.amount);
      } else {
        return accum;
      }
    }, 0);

    setIncome(totalIncome);
    setExpense(totalExpense);
    setFilterTxn(transactionsArr);
  }, [transactionsArr]);

  //toggle isOpen
  function toggleIsOpen() {
    setIsOpen((prevVal) => !prevVal);
  }

  //function to get the color on basis of balance
  function getColor() {
    if (income - expense > 0) {
      return "green";
    } else if (income - expense < 0) {
      return "red";
    } else {
      return "black";
    }
  }

  return (
    <>
      <h1 className="title">Expense Tracker</h1>
      {/* main container  */}
      <div className="main-container flex-column">
        <div className="balance-container flex-row">
          <h1 className="sub-title ">
            Balanace:{" "}
            <span style={{ color: getColor() }}>
              ${Math.abs(income - expense)}
            </span>
          </h1>
          <button onClick={toggleIsOpen} className="btn">
            {isOpen ? "CANCEL" : "ADD"}
          </button>
        </div>

        {/* add transaction form  */}
        {isOpen && (
          <Addtransaction
            setIsOpen={setIsOpen}
            setTransactionsArr={setTransactionsArr}
          />
        )}

        {/* details div  */}
        <Details income={income} expense={expense} />

        {/* transactions div  */}
        <div className="transactions-container flex-column">
          <h2 className="sub-title">Transactions</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search"
          />
          {filterTxn.map((transactionObj, index) => {
            return (
              <Transaction
                key={index}
                billtype={transactionObj.billtype}
                amount={transactionObj.amount}
                transtype={transactionObj.transtype}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
